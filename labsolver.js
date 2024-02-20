Java.perform(() =>{
    // challenge 1 - change other class.method value
    console.log("[+] starting challenge 1");
    // access class challenge_01
    var challenge_1 = Java.use("uk.rossmarks.fridalab.challenge_01");
    console.log("[+] changing chall01 value");
    // change class.method.value
    challenge_1.chall01.value = 1;
    console.log('[+] new value = ' + challenge_1.chall01.value);

    // challenge 2 - make live instances/object to run unused method in a class
    console.log("[+] starting challenge 2");
    var main;
    // enumerate live instances
    Java.choose("uk.rossmarks.fridalab.MainActivity",{
        // called live instances
        onMatch: function(instance){
            main = instance;
        },
        onComplete: function() {}
    });
    main.chall02();
    console.log("[+] Called function chall02");
    
    // challenge 3
    console.log("[+] starting challenge 3");
    // change a method return value using overload() and change the output
    // https://www.w3schools.com/java/java_methods_overloading.asp
    main.chall03.overload().implementation = function () {
        return true;
    };
    console.log("changed chall03 return value");

    // challenge 4
    console.log("[+] starting challenge 4");
    // function send untuk run function with its own parameter
    // run function saja pake parameter frida
    send(main.chall04("frida"));

    // challenge 5
    console.log("[+] starting challenge 5");
    main.chall05.overload('java.lang.String').implementation = function(arg) {
        this.chall05.overload('java.lang.String').call(this,'frida');
        return;
    };
    
    // challenge 6
    console.log("[+] starting challenge 6");
    setTimeout(function(){
        var challenge_06 = Java.use("uk.rossmarks.fridalab.challenge_01");
        challenge_06.addChall06.overload('int').implementation = function(arg0) {
            console.log("[+] solving challenge 6");
            Java.choose('uk.rossmarks.fridalab.MainActivity', {
                onMatch: function(instance){
                    instance.chall06(challenge_06.value);
                },

            });
        }
    },10000);

    console.log("[+] running challenge 6");
    main.chall06(9000);

    // challenge 7
    console.log("[+] Starting challenge 7");
    var challenge_07 = Java.use("uk.rossmarks.fridalab.challenge_07");
    console.log("[+] Target PIN " + challenge_07.chall07.value);
    for(var i = 0; i<=9999; i++){
        var test_pin = String(i).padStart(4, '0');
        if(challenge_07.check07Pin(test_pin)){ // 4 karena lengthnya pinnya ada 4
            console.log("[+] PIN FOUND");
            main.chall07(test_pin);
            break;   
        }   
    }

    // challenge 8
    console.log("[+] Starting challenge 8");
    var button = Java.use('android.widget.Button');
    var checkid = main.findViewById(2131165231);
    var check = Java.cast(checkid, button);
    var string = Java.use('java.lang.String');
    check.setText(string.$new("Confirm"));
    console.log("[+] button text changed")

});
