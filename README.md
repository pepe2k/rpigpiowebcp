RPi GPIO Web Control Panel
==========================

About
-----

This is a simple and light web control panel for manipulating GPIO ports in **Raspberry Pi**.

![RPi GPIO Web Control Panel ver. 1.0](http://www.tech-blog.pl/wordpress/wp-content/uploads/2012/12/rpigpiowebcp_v1sm.jpg)

It is based on:

- **bcm2835** library - used for GPIO access (http://www.open.com.au/mikem/bcm2835/, GPLv2 license)
- **KoanLogic Srl KLone** - as a web server (http://www.koanlogic.com/klone/, Simplified BSD license)
- **jQuery** library - used for HTML DOM manipulation and animations (http://jquery.com/, MIT License)

Features
--------

- Simple HTML/CSS without any graphic files.
- You can define which of GPIO ports you want to use as an input and which as an output.
- Main page displays current status for all defined GPIO ports.
- You can change value for GPIO defined as output simply by click on its label.

Installation
------------

1. Give your Raspberry Pi access to the Internet.
2. Download and install **bcm2835** library from http://www.open.com.au/mikem/bcm2835/, make sure it is working!
3. Read about pin numbering in **bcm2835** library and something about **KLone** web server.
4. Download **RPi GPIO Web Control Panel** in zip archive, extract it.
5. Change declaration for GPIO ports in *lib/rpigpiowebcp.c* file (*gpio_outs[]* and *gpio_ins[]* arrays) or use default values.
6. Refer to KLone config file in *webapp/etc/kloned.conf*.
7. Run *make* and wait...
8. If everything went well run *sudo ./kloned -F* (this command will run KLone daemon in foreground mode) and go to your Raspberry Pi IP address in your browser.
9. CTRL+C to stop KLone daemon.

Future plans
------------

- Multi languages support (now only Polish).
- Access only for authorized users (login form, sessions).
- Change working mode from cyclic "polling" server for data to "push" data from server to browser.
- Change GPIO ports definition during operation and store settings in external file/files.
- Support for other GPIO manipulating libraries or make own.
- SPI, I2C, UART support.

ChangeLog
---------

- **1.0**: Initial release (01-12-2012)