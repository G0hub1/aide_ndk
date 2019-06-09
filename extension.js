
//DroidScript extension util class.
function Extension()
{
    var serverIP = ""       //DS ip.
    
    //Hook into cross frame messaging
    window.addEventListener("message", function(event) 
    {
    	var params = event.data.split("|");
    	var cmd = params[0];
    	if( cmd=="ip" ) serverIP = params[1];
    	
    	//Fire OnReady callback.
    	if(typeof ext_OnReady=='function') ext_OnReady()
    });

    //Initialise the extension.
    this.Init = function()
    {
        //Ask parent for DS ip adddress.
    	parent.postMessage( "getip:", "*" )
    }
    
    //Callbacks.
    this.SetOnReady = function( callback ) { onReady = callback }
    
	//Execute code on the device.
	//'app' mode runs as a stand-alone app.
	//'ide' mode runs inside ide.
	//'usr' mode runs inside current user app.
	this.Execute = function( mode, code ) 
	{ 
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "get", "/ide?cmd=execute&mode="+mode+"&code="+encodeURIComponent(btoa(code)), true );
		xmlHttp.send();
	}
		
	//Execute shell commands with output is shown in debug tab.
	//(Same as typing into WiFi IDE debug tab)
	this.SysExec = function( code ) 
	{ 
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "get", "/ide?cmd=exec&code=" + encodeURIComponent("$"+code), true );
		xmlHttp.send();
	}
	
	//Get the current open app object.
	this.GetOpenApp = function()
	{
	    var openApp = parent.client.appService.getOpenApp();
	    //alert( openApp.getName() );
	    return openApp;
	}
	
	//Get the ip address of the DroidScript server.
	this.GetServerIp = function()
	{
	    return serverIP; 
	}
}

//Create single global instance.
var ext = new Extension();
