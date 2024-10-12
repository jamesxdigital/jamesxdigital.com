const fragShaderSource =
  "precision highp float;\n#define POINTS 3 // try between 2 and 256, gets slow fast\n#define PI 3.1415926536\n#define TAU (2.0 * PI)\nuniform vec2 u_resolution;\nuniform float u_time;\nuniform int u_shouldInvert;\nvec3 rgb(float r, float g, float b) {\n  return vec3(r / 256.0, g / 256.0, b / 256.0);\n}\nvec3 hsv2rgb(vec3 c) {\n    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\nvoid main() {\n  // These colors will come in to use at the end to help constrain the final\n  // output colors\n  vec3 col1 = hsv2rgb(vec3(0.7922, 0.3, 0.9451));\n  vec3 col2 = hsv2rgb(vec3(0.2039, 0.1, 0.2118));\n    \n  vec2 uv = gl_FragCoord.xy/u_resolution;\n  vec2 mouse = vec2(0.1, 1.0);\n  float bias = pow(10.0, (-0.5) * 20.0);\n  float power = 8.0;\n  float cN = 0.0;\n  // array used to store contributions in first loop\n  float contribution[POINTS];\n  for (int i = 0; i < POINTS; i++) {\n    float f = float(i) / float(POINTS) * TAU;\n    vec2 pos = 0.5 + 0.35 * vec2(\n      cos(-u_time * 0.15 + f+ float(i) * 0.1),\n      sin(u_time * 0.8 + f * 2.0) - float(i) * 0.1\n    );\n    pos = uv - pos;\n    float dist = length(pos);\n    // calculate contribution\n    float c = 1.0 / (bias + pow(dist, power));\n    contribution[i] = c;\n    // sum total contribution\n    cN += c;\n  }\n  // normalize contributions and weigh colors\n  vec3 col = vec3(0, 0, 0);\n  cN = 1.0 / cN;\n  for (int i = 0; i < POINTS; i++) {\n    float f = float(i) / float(POINTS) * TAU + u_time * 0.5;\n    vec3 pcol = 0.5 + 0.5 * sin(mix(col1, col2, f * 3.0));\n    col += contribution[i] * cN * pcol * mix(col1, col2, uv.y);\n  }\n  vec3 finalCol = u_shouldInvert == 0 ? col : 1.0 - col;\n  gl_FragColor = vec4(finalCol, 1.0);\n}";
const vertShaderSource =
  "attribute vec2 a_position;\nvoid main() {\n  gl_Position = vec4(a_position, 0, 1);\n}";

// Global variables
const FRAME_DELTA_TOLERANCE = 100;
let LAST_FRAME_TIME = 0;
let FPS_DROPS = 0;
let INITIAL_URL;
let CURRENT_URL;
let CURRENT_WINDOW_WIDTH;
let CURRENT_WINDOW_HEIGHT;

function stopDrawing() {
  if (CURRENT_FRAME_ID) {
    window.cancelAnimationFrame(CURRENT_FRAME_ID);
    CURRENT_FRAME_ID = undefined;
  }
}

function startDrawing(canvas) {
  INITIAL_URL = CURRENT_URL = window.location.toString();

  const { clientWidth, clientHeight } = canvas;
  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const context = canvas.getContext("webgl");
  if (!context) {
    console.warn(
      "WebGL canvas is not supported, aborting initialisation of background animation."
    );
    return;
  }
  context.viewport(0, 0, canvas.width, canvas.height);

  // Create the buffer - this buffer just renders two triangles as a rectangle the size of the canvas
  const buffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, buffer);
  context.bufferData(
    context.ARRAY_BUFFER,
    new Float32Array([
      -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
    ]),
    context.STATIC_DRAW
  );

  // Create the shaders
  const vertexShader = context.createShader(context.VERTEX_SHADER);
  context.shaderSource(vertexShader, vertShaderSource);
  context.compileShader(vertexShader);
  const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
  context.shaderSource(fragmentShader, fragShaderSource);
  context.compileShader(fragmentShader);

  // Connect the shaders and program to the renderer
  const program = context.createProgram();
  context.attachShader(program, vertexShader);
  context.attachShader(program, fragmentShader);
  context.linkProgram(program);
  context.useProgram(program);

  // Delete components early to improve performance
  context.deleteShader(vertexShader);
  context.deleteShader(fragmentShader);
  context.deleteProgram(program);

  // Connect to the position attribute for the vertex shader
  const positionLocation = context.getAttribLocation(program, "a_position");
  context.enableVertexAttribArray(positionLocation);

  // Set the resolution uniform and create a connection to the time uniform
  const resolution = [canvas.width, canvas.height];
  const resolutionPosition = context.getUniformLocation(
    program,
    "u_resolution"
  );
  const timePosition = context.getUniformLocation(program, "u_time");
  const shouldInvertPosition = context.getUniformLocation(
    program,
    "u_shouldInvert"
  );

  let shouldInvert = true;
  // Inverts the colours if the user has a dark mode shouldInvert
  // const mql = window.matchMedia("(prefers-color-scheme: dark)");
  // let shouldInvert = !mql.matches;
  // mql.addEventListener("change", (e) => {
  //   shouldInvert = !e.matches;
  // });

  // Reset the spike counter when focusing away since requestAnimationFrame
  // doesn't tick on inactive windows anyway
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) return;
    FPS_DROPS = 0;
  });

  /* The main render loop */
  // First, we'll start a random seed to create a different starting scene on
  // each canvas mount
  const seed = Math.round(Math.random() * 20000);

  function render(currentFrameTime) {
    const framesDelta = currentFrameTime - LAST_FRAME_TIME;
    LAST_FRAME_TIME = currentFrameTime;

    // If the loop is lagging and the document is in focus,
    // mark it as an FPS drop
    if (framesDelta > FRAME_DELTA_TOLERANCE && document.hasFocus()) {
      CURRENT_URL = window.location.toString();
      // Only if the page URL hasn't changed do we really need to worry about
      // FPS spikes
      if (CURRENT_URL === INITIAL_URL) {
        FPS_DROPS += 1;
      } else {
        // Otherwise, reset the spike counter ready for the next mount
        FPS_DROPS = -1;
      }
    }

    // Three strikes and we're out
    if (FPS_DROPS >= 3) {
      stopDrawing();
      return;
    }

    // Clear GLSL canvas
    context.clear(context.COLOR_BUFFER_BIT);

    // Update GLSL attributes and uniforms
    context.vertexAttribPointer(
      positionLocation,
      2,
      context.FLOAT,
      false,
      0,
      0
    );
    context.uniform2fv(resolutionPosition, resolution);
    context.uniform1f(timePosition, currentFrameTime / 2000.0 + seed);
    context.uniform1i(shouldInvertPosition, Number(shouldInvert));

    // Draw arrays
    context.drawArrays(context.TRIANGLES, 0, 6);

    CURRENT_FRAME_ID = window.requestAnimationFrame(render);
  }

  render(0);
}

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#background-canvas");

  if (!canvas) {
    throw new Error("Background canvas not found");
  } else {
    startDrawing(canvas);

    CURRENT_WINDOW_WIDTH = window.clientWidth;
    CURRENT_WINDOW_HEIGHT = window.clientHeight;
    window.addEventListener("resize", () => {
      const shouldRestart =
        CURRENT_WINDOW_WIDTH !== window.clientWidth ||
        CURRENT_WINDOW_HEIGHT !== window.clientHeight;
      if (shouldRestart) {
        CURRENT_WINDOW_WIDTH = window.clientWidth;
        CURRENT_WINDOW_HEIGHT = window.clientHeight;
        stopDrawing();
        startDrawing(canvas);
      }
    });
  }
});
