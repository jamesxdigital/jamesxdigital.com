---
layout: post
title: Spline X  Patata Challenge
image: "/images/2022/06/SPLINE.gif"
author: jamesxdigital
featured: true
tags:
  - 3D
---

Welcome to the deep-dive section of my <a href="https://spline.design/Spline" target="_blank">Spline</a> X <a href="https://cabezapatata.com/" target="_blank">Patata</a>. Challenge submission! Here you will find further info on some parts of my project. 🔎

Every single object and material was designed and put together by me. I still have so many ideas I want to implement, but this is what I had time to implement before the competition deadline. 🧑‍🎨

This page is also a test drive for Spline's ability to embed any project onto a webpage (which works flawlessly). Below, I have embedded two slightly different versions:

- The default experience with a fixed camera 🎥
- A free camera version where you can have a better look around the project 🤳

<select style="display: block" class="switcher">
  <option value="https://my.spline.design/interactiveskategamefixedcameracopy-2eef31cd1fa496f59c19882a0bf05d58/">🎥 Default fixed camera</option>
  <option value="https://my.spline.design/interactiveskategamefreecamera-8f745fa3973cd555a32b2922ad9750cb/">🤳 Free camera </option>
</select>

<iframe class="switch-target" frameborder='0' width='100%' height='500px' allowfullscreen src="" scrolling="no"></iframe>

_Depending on your internet speed, you'll just see a ⬜️ white screen until it fully loads. ⏳_

# View both fullscreen on Spline

<form action="https://my.spline.design/interactiveskategamefixedcameracopy-2eef31cd1fa496f59c19882a0bf05d58/" target="_blank">
    <input type="submit" value="🎥 Default fixed camera - full screen" />
</form>

<form action="https://my.spline.design/interactiveskategamefreecamera-8f745fa3973cd555a32b2922ad9750cb/" target="_blank">
    <input type="submit" value="🤳 Free camera - full screen" />
</form>

<br>

# 🧍‍♂️ Character Illustration

![Figure Illustartion]({{ site.baseurl }}/images/2022/06/Figure_Illustration-min.jpg)

![Character Inpsiration]({{ site.baseurl }}/images/2022/06/Posters.png#left)

For the character, I wanted to draw inspiration from Cabeza Patata's trademark style. I first designed the character with Photoshop to get the initial idea before building it in Spline, which was the fun part! 🏗

It's a long process as everything from each hair curl (which are just spheres) to each shoelace (which are cut-out toruses 🍩) had to be created.

Everything is then parented to each other so that when different states are activated (such as doing a kickflip), attached limbs move as they would in real life. 🦾

# 💻 Laptop Design

![Road texture]({{ site.baseurl }}/images/2022/06/Keyboard.png#left)
The main laptop body has a convincing metallic material, but I am most proud of the keys. Using the 'Depth' material, it was possible to give a subtle radial gradient to give the keyboard signs of use. ⌨️

Each character and icon have been either made from scratch or are text with a font applied. 🆒

Each key has different states and actions. When pressing a ⚪ white key, the key moves down then up only. But when you press a 🔵 blue key, there are a whole bunch of actions that are activated. 🎬

# 🌃 Environment Design

![Road texture]({{ site.baseurl }}/images/2022/06/road-min.jpg#right)

A lot of performance considerations had to be made when creating the environment.

Inititally the skateboarder physically moved across a long scene, and once at the end, it would return to the beginning and repeat. I eventually figured that this was not the best idea, so I re-developed it so that the skateboarder stays still and instead the environment moves and repeats. 🔁

For the 🛣️ road, I made the texture as short as possible, as I could then repeat it, rather than having duplicated pixels.

For the 🌃 side walls, I wanted to add more variations, so the texture is longer, but I still designed it so that it repeats perfectly.

Both textures were designed in Photoshop and then optimized to make them as small as possible.

![Wall texture]({{ site.baseurl }}/images/2022/06/WallSmall-min.jpg)

# 🏗 Material Design and Action Setup

![All the actions]({{ site.baseurl }}/images/2022/06/Materials.png)

![All the actions]({{ site.baseurl }}/images/2022/06/all_materials.png#right)
![All the actions]({{ site.baseurl }}/images/2022/06/ACTIONS.gif#left)

In total, there are 24 different material assets that I have made for this project. The beauty of assigning material assets to objects is that it is possible to change the appearance of multiple objects that share the same material at once. This could be a useful feature when implementing a "change character's clothing" feature, that actions with the click of a button. 🤔

There are hundreds of different object states and events in the project. Everything from the environment, the skateboard, to the character's eyes have multiple states and events within them alone. The scrolling GIF here gives an insight into all of the events that are attached to only one of the laptop keyboard keys. 🤯

Adding these details is the most fun part of building and designing in Spline. It's easy to get carried away and keep implementing details that only the creator will ever notice. 🎨

Here are some other details that you may have not noticed in this project:

- The character is breathing in and out (by scaling the torso up and down) 😮‍💨
- His eyes are moving around (by offsetting the eye image texture between two different values) 👀
- His arms are moving (using the following mouse feature) 💪
- His hair moves in the wind (by simply moving the hair sphere's up and down and giving each sphere a different delay value for some randomness) 🦱

Feel free to comment below if you have any questions about this project! Thanks ✌️