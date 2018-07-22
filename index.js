var request = require('request');

var Service;
var Characteristic;

module.exports = function (homebridge)
{
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-pushed-notifications", "GetPushedNotification", PushedNotificationAccessory);
}

function PushedNotificationAccessory(log, config)
{
  this.log = log;
  this.accessoryLabel = config['accessory'];
  this.name = config['name'];

  this.serviceAppKey = config['app_key'];
  this.serviceAppName = config['app_name'];
  this.serviceAppSecret = config['app_secret'];
  this.notificationMessage = config['message'];
  this.muteNotificationIntervalInSec = config['mute_notification_interval_in_sec'];

  this.log(" app key " + this.serviceAppKey);
  this.log(" event " + this.serviceAppName);
  this.log(" message " + this.message);
  this.log(" mute notification interval in sec " + this.muteNotificationIntervalInSec);

  this.serviceMuted = false;
  this.stateValue = 0;

  this.SendNotification = function()
  {
    this.log('Send notification to GetPushed: ' + this.notificationMessage);

    const data = {
      'app_key': this.serviceAppKey,
      'app_secret': this.serviceAppSecret,
      'target_type': "app",
      'content': this.notificationMessage
    };

    request.post({url:'https://api.pushed.co/1/push', form: data}, function(err,httpResponse,body)
    { 

    });

  }
}


PushedNotificationAccessory.prototype =
{

  getValue: function(callback) {
        var that = this;
        callback(null, false);
  },

  setValue: function (value, callback)
  {
    this.log('setState ' + value);
    this.stateValue = value;

    if (this.stateValue == 1) {
      // 'that' is used inside timeout functions
      var that = this;

      // Clear the On value after 250 milliseconds 
      setTimeout(function() {that.stateValue = 0; that.btnService.setCharacteristic(Characteristic.On, 0) }, 500 );

      // Send GetPushed notification
      if (this.serviceAppKey) {
         if (this.serviceMuted == false) {
           this.SendNotification();

           // Mute further notifications for specified time
           this.serviceMuted = true;
           setTimeout(function() {that.serviceMuted = false; that.log("GetPushed un-muted");}, this.muteNotificationIntervalInSec * 1000);
         }
         else {
           this.log("GetPushed notification is muted");
         }
       }
    }
    callback(null);
  },

  identify: function (callback)
  {
    this.log("Identify requested!");
    callback();
  },

  getServices: function ()
  {

        var services = [];
        var infoService = new Service.AccessoryInformation();
        infoService
            .setCharacteristic(Characteristic.Manufacturer, "Acc-UA")
            .setCharacteristic(Characteristic.Model, "GetPushedNotificationButton")
            .setCharacteristic(Characteristic.SerialNumber, "GetPushedNotificationButton2017");
        services.push(infoService);

        this.btnService = new Service.Switch(this.name);
         this.btnService
            .getCharacteristic(Characteristic.On)
            .on('get', this.getValue.bind(this))
            .on('set', this.setValue.bind(this));
        services.push( this.btnService);

        return services;


  }

  

   

};
