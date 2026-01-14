# Soundcraft custom UI

Connect to a stationary Soundcraft UI-series mixer with a custom UI. Great for situations where the user is not technically oriented, or you just don't want to show every bit of top-notch British GUI engineering.

![alt text](https://software.collinsgroup.fi/web/Screenshot%202026-01-09%20at%2012.21.55.png "Simple UI")

## Step-by-step walkthrough
These steps assume you're installing a UI-mixer to *some location*, and only need to expose the overall volume of a certain group of inputs.
1. Get a Raspberry Pi, any model will do. A LAN connection is recommended, though the messages will be transferred reasonably well over a WLAN too. This machine does not need to be connected to the Internet, but it should be accessed by devices in the same network.
2. Once the RPB has been installed and is running, run this command: `sudo apt update && sudo apt upgrade && sudo apt install npm && sudo npm install pm2 -g && cd soundcraft-ui && npm install && pm2 start server.js -n SoundcraftVolControl && pm2 save`
3. Connect to the RPB's IP address, and to port `3000`.

## Configuration

The code is configured assuming:
- The mixer SHALL be assigned with the IP address `192.168.100.199`, by means of MAC-binding or a static IP set up in the mixer
- The channels whose volume the user wishes to control, SHALL be submitted to VCA 1.

To change the IP address, the user may edit `target` in `server.js`.

## Control schema

A control command is constructed as follows: `SETD^x.n.y^v`, where
- `x`: Object category
- `n`: Object index from 0
- `y`: Control name
	- May be appended with `.z`, where `z` is an object index in the scope of `n`.
- `v`: value, where the scale SHALL be 0...1, `bool`: `0`=`false`, `1`=`true`

Example: `SETD^v.0.mix^0.7796` sets `VCA 1` `volume` at `≈ unity`

## Known issues

Soundcraft uses the version of Socket.IO that the dinosaurs used. Safari doesn't generally like this, so for embed systems either Chromium or anything other than a WebKit browser will do.

## Custom functions for commercial settings
With this proxy, you can build a custom frontend for the mixer. The image below shows an example from an [OB1](https://fremen.fi/software/ob1) used in radio productions. For custom-build-related requests, [contact Fremen](https://fremen.fi/contact).

![alt text](https://collins-swdel.b-cdn.net/web/IMG_1003.JPG "Example image from OB1, showing the mixer frontend.")
