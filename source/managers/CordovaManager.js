/*=====================================================================================================
 _______  _______  ______    ______   _______  __   __  _______    __   __  _______  __    _  ______   
|       ||       ||    _ |  |      | |       ||  | |  ||   _   |  |  |_|  ||       ||  |  | ||    _ |  
|       ||   _   ||   | ||  |  _    ||   _   ||  |_|  ||  |_|  |  |       ||    ___||   |_| ||   | ||  
|       ||  | |  ||   |_||_ | | |   ||  | |  ||       ||       |  |       ||   | __ |       ||   |_||_ 
|      _||  |_|  ||    __  || |_|   ||  |_|  ||       ||       |  |       ||   ||  ||  _    ||    __  |
|     |_ |       ||   |  | ||       ||       | |     | |   _   |  | ||_|| ||   |_| || | |   ||   |  | |
|_______||_______||___|  |_||______| |_______|  |___|  |__| |__|  |_|   |_||_______||_|  |__||___|  |_|
=======================================================================================================*/

goog.provide("managers.CordovaManager");

goog.require('managers.Analytics');

var CordovaManager = {
    // Application Constructor
    initialize: function() {
        CordovaManager.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    bindEvents: function() {
        // The event fires when Cordova is fully loaded.
        document.addEventListener('deviceready', CordovaManager.onDeviceReady, false);
        // The 'pause' event fires when an application is put into the background.
        // -also-
        // The iOS-specific 'resign' event is available as an alternative to pause, and detects when users enable the Lock button to lock the device with the app running in the foreground. 
        document.addEventListener("resign", CordovaManager.onResign, false);
        // The 'resume' event fires when an application is retrieved from the background.
        document.addEventListener("resume", CordovaManager.onResume, false);

        // other events [ http://docs.phonegap.com/en/3.3.0/cordova_events_events.md.html ]:
        // online
        // offline
        // backbutton
        // batterycritical
        // batterylow
        // batterystatus
        // menubutton
        // searchbutton
        // startcallbutton
        // endcallbutton
        // volumedownbutton
        // volumeupbutton

    },
    // deviceready Event Handler
    //
    onDeviceReady: function() {
        Analytics.trackSessionStartInfo("deviceReady");
    },
    // resign Event Handler
    //
    onResign: function() {
        //alert("RECEIVED RESIGN EVENT!");
    },
    // resume Event Handler
    //
    onResume: function() {
        Analytics.trackSessionStartInfo("resume");
    }
};
CordovaManager.initialize();
