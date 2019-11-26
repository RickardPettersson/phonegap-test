var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        var that = this;

        document.getElementById("start-scan").onclick = function() {
			
			// https://github.com/phonegap/phonegap-plugin-barcodescanner#readme
            cordova.plugins.barcodeScanner.scan(
			  function (result) {
				  that.updateResults(result);
			  },
			  function (error) {
				  that.updateResults(error, true);
			  },
			  {
				  preferFrontCamera : false, // iOS and Android
				  showFlipCameraButton : false, // iOS and Android
				  showTorchButton : false, // iOS and Android
				  torchOn: false, // Android, launch with the torch switched on (if available)
				  saveHistory: false, // Android, save scan history (default false)
				  prompt : "Place a barcode inside the scan area", // Android
				  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
				  //formats : "QR_CODE,PDF_417,CODE_128", // default: all but PDF_417 and RSS_EXPANDED
				  orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
				  disableAnimations : true, // iOS
				  disableSuccessBeep: false // iOS and Android
			  }
		   );
        };

    },
    updateResults: function(result, err) {
        var ele = document.getElementById("last-result");
        if(err) {
            addClass(ele, "error");
        } else {
            removeClass(ele, "error");
        }
        if(typeof result == "object") {
            result = JSON.stringify(result, null, 2);
        }
        if(err) {
            result = "ERROR\n"+result;
        }
        document.getElementById("last-result").innerText = result
    }
};

function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
    if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}

app.initialize();