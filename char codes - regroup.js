

function getCode(code){
    if(code < 45 || code > 126){
        return code         // leave "as is"
    
    } else if(code < 48){   // tricky-dicky flippity-flops
        
        if(code < 46){
            return 63;          // - bump just under 0-9
        
        } else if(code < 47){
            return 74;          // . move above 0-9
        
        } else {
            return 45;          // / bump below -
        }

    } else if(code < 58){   // 0-9
        return code + 16;
    
    } else if(code < 65){   // punctuation group 1 (7 chars)
        return code - 12;
    
    } else if(code < 91){   // A-Z
        return code + 10;   // NOTE: default case-insensitive never looks past here
                            //       so for ultra optimization, the next 2 groups can
                            //       be deleted (leaving the last else in-tact)
    
    } else if(code < 97){   // punctuation group 2 (5 chars)
        return code - 38;
    
    } else if(code < 123){  // a-z
        return code + 4;
    
    } else {                // punctuation group 3 (4 chars)
        return code - 64;
    }

}

//var code = str.charCodeAt(i);

var see = {};
for(var i=0; i<140; i++){
    var code = getCode(i);
    see[code] = String.fromCharCode(i);
}

for(var prop in see){
    console.log(prop + " : " + see[prop]);
}

