---
layout: post
title: Arduino Air Quality Sensor
image: /assets/images/2017/11/arduino_airquality/airqualitybreadboard.png
tags:
  - Code
---

In an effort to contribute to the global awareness of air quality, I built an Air Quality Sensor equipped with a dashboard and mobile notification functionality. This project was powered by an Arduino ESP32 and utilized services like [IFTTT](http://ifttt.com), [io.adafruit](http://io.adafruit.com), along with multiple sensors, wires, and resistors.

#### The Why?

Air pollution is a critical issue, causing 7 million premature deaths annually worldwide. When inhaled, pollutants can enter the bloodstream and damage vital organs. Thus, the goal was to promote better air quality awareness through this project.

#### Design

The design incorporated the following components:

1. **Arduino ESP32:** A low-power system with Wi-Fi & Bluetooth, perfect for IoT devices.
2. **MQ-135 Gas Sensor:** Detects various gases based on resistance settings.
3. **GP2Y1010AU0F Dust Sensor:** An optical sensor effective in detecting fine particles.
4. **DC-DC Boost Module:** Converts a single Lithium-Ion Polymer Battery output to a stable 5V.
5. **Lithium-Ion Polymer Battery:** A light yet powerful source with a 1200mAh capacity.
6. **Breadboard:** A terminal array board for assembling the circuit without soldering.

![Arduino Air Quality Sensor Raw Image]({{ site.baseurl }}/assets/images/2017/11/arduino_airquality/airqualityraw.jpg#right)

#### Technical Details

- The gas sensor data is read from the A4 analog pin.
- The dust sensor data is read from the A3 analog pin.
- The DC-DC Boost Module ensures the sensors receive a stable 5V from the battery.

**Schematics**

Design schematics were vital for accurate assembly:

![Arduino Air Quality Breadboard]({{ site.baseurl }}/assets/images/2017/11/arduino_airquality/airqualitybreadboard.png)
![Arduino Air Quality Schematic]({{ site.baseurl }}/assets/images/2017/11/arduino_airquality/airqualityschematic.png)

#### Capabilities

**Internal Logic:**

The device operates through a simple pseudocode:

- Initialize and connect to Wi-Fi and io.adafruit via MQTT.
- Read sensor data and publish to io.adafruit feeds.
- Enter sleep mode for power efficiency.

**External Integration:**

Data from sensors are visualized on the io.adafruit dashboard and integrated with IFTTT for real-time notifications based on air quality readings.

<table width="70%" border="0">
  <tr>
    <td colspan="2"><img src="{{ site.baseurl }}/assets/images/2017/11/arduino_airquality/airqualityifttt.png" alt="IFTTT Integration"></td>
  </tr>
  <tr>
    <td><img src="{{ site.baseurl }}/assets/images/2017/11/arduino_airquality/airqualityiftttdust.png" alt="IFTTT Dust Sensor Notification"></td>
    <td><img src="{{ site.baseurl }}/assets/images/2017/11/arduino_airquality/airqualityiftttgas.png" alt="IFTTT Gas Sensor Notification"></td>
  </tr>
</table>

#### Operation

**Dashboard:**

The io.adafruit dashboard showcases gas and dust data feeds, displayed as data flow, line graphs, and live gauges.

<table width="100%" border="0">
  <tr>
    <td><img src="{{ site.baseurl }}/assets/images/2017/11/arduino_airquality/airqualityiodust.png" alt="Dashboard Visualization"></td>
  </tr>
</table>

**Notifications:**

IFTTT applets send notifications to my phone when dust or gas readings exceed preset thresholds.

<table width="100%" border="0">
  <tr>
    <td><img src="{{ site.baseurl }}/assets/images/2017/11/arduino_airquality/airqualityiphonedust.png" alt="Dust Sensor Notification"></td>
    <td><img src="{{ site.baseurl }}/assets/images/2017/11/arduino_airquality/airqualityiphonegas.png" alt="Gas Sensor Notification"></td>
  </tr>
</table>

Through this project, I aimed to provide a tool that raises awareness about air quality, empowering individuals to make informed decisions for healthier living environments.
