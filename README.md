# homebridge-pushed-notification
Create accessories used to send GetPushed (https://pushed.co) push notifications using HomeKit Automation

The Homebridge Notification accessory is a simple switch which sends a notification to GetPushed whenever it is toggled On. The Notification accessory is meant to be used in conjunction with HomeKit Automation. A user can program an automation using the Home app to send a notification whenever an event/state (or combination of) occurs. This is done by programming the Automation to set the Notfication accessory state to On. Currently, the Home application only supports native notification from sensors such as Motion Detectors, Presense Sensors, Door Locks, etc.. This Homebridge accessory bridges the gap and allows any HomeKit state to trigger a notification. For example, you can send a notification if the temperature in your home is below a threshold but the thermostat is currently turned off. 

## Installation
[![npm version](https://badge.fury.io/js/homebridge-mi-aqara.svg)](https://www.npmjs.com/package/homebridge-pushed-notification)

## GetPushed Configuration

### "app_key"
Your GetPushed APP key. Set the key to empty if you do not want to receive notifications.

### "app_secret"
The GetPushed APP secret string.

### "app_name"
The name of GetPushed application

### "message"
The message which is to be sent to IFTTT if the accessory is toggled On. 

### "mute_notification_interval_in_sec"
This value specifies how long notification should be muted after a trigger. This is to prevent notification flooding if the Automation which triggered the notification is repeated.

