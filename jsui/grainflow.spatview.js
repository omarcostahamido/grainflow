
var outPos;
var inPos = new Dict("inPos" + String(Math.floor(Math.random()*100000+1000)));
var falloffD = 1.1;
var spreadxyz = [0.5,0.5,0.5];
var spreadxyzinner = [0,0,0];
var centerpos = [0,0,0];
var gcolor1= [1, 1, 0];
var gcolor2 = [0, 1,1];
var drawTask = new Task(drawLoop, this);
drawTask.interval= ((1/24)*1000);
	drawTask.repeat(-1);

sketch.default2d();
draw();
var activationColor = [0, 1., 0, 1]; 
var speakerAmps = [0];

sketch.glshademodel("smooth");
sketch.glrotate(0,1,0,0);
//sketch.glenable("blend");
//sketch.glmatrixmode("projection");

sketch.glblendfunc("src_alpha","one_minus_src_alpha");

var width = box.rect[2] - box.rect[0];

function setSpeakerAmps(){
	speakerAmps = arrayfromargs(arguments);
	//post(speakerAmps, "\n");
	}

function draw(){
    with (sketch){
		//glclearcolor(0., 0., 0., 1.);

        glclear();			
		moveto(0,0);

        if (outPos){
            var k = outPos.getkeys();
            if (k){
            for (var i = 0; i <k.length; i++){
                
                var pos = outPos.get(k[i])
                if (pos.length == 3){
                    moveto(pos[0]*0.5,pos[1]*0.5);
                }
                if (pos.length == 2){
                    moveto(pos[0]*0.5,pos[1]*0.5);
                }
				ampColor = 0;
				if (speakerAmps[i] != undefined){
					ampColor = speakerAmps[i];
					}
                glcolor(0.7,1,0.7,0.1+0.9*ampColor);
                circle(falloffD*0.5);
                glcolor(0,0,0,1);
				move(0,0,2);
                circle(0.025);


            }
        }
        }

        if (inPos){
            var k = inPos.getkeys();
            if(k){
            for (var i = 0; i <k.length; i++){
				var cfact = i/(k.length-1)
				var thisColor = [0,0,0];
				for (var j = 0; j<2; j++) thisColor[j]=gcolor1[j]*(1-cfact)+gcolor2[j]*cfact;
                glcolor(thisColor[0],thisColor[1],thisColor[2],1);
                var pos = inPos.get(k[i])

                moveto(pos[0]*0.5,pos[1]*0.5, pos[2]*0.5);
				
                sphere(0.0125);


            }
            
        }
    }


    if (centerpos){
    moveto(centerpos[0]*0.5,centerpos[2]*0.5,centerpos[1]*0.5);
    }



    if (spreadxyz){
    
        glcolor(0,0,0,0.75);
        gllinewidth(1);
        frameSphere(spreadxyz[0]*0.75,spreadxyz[2]*0.75,spreadxyz[1]*0.75);
		
    }

    if (spreadxyzinner){
        glcolor(0,0,0,0.2);
        gllinewidth(0.1);
        frameellipse(spreadxyzinner[0]*0.5,spreadxyzinner[2]*0.5,0,360);
    }
    }    
}

function rotateScene(r, x,y,z){
	sketch.glrotate(r,x,y,z);
	
	}

function falloffDistance(d){
    falloffD = d;
} 

function speakers(){

    args = arrayfromargs(arguments);

    if (args[0] === "dictionary"){
	//Use existing dict
        outPos = new Dict(args[1]);
    }
    else{
	//Creates new dictionary from values
		outPos = new Dict();
		for (var i=0 ; i < Math.floor(args.length/3); i++){
			outPos.set(i+1, args.slice(i*3,(i*3+3))); 
			}
    }

}

function drawLoop(){
    draw();
    refresh();
}

function pos(){
    var args = arrayfromargs(arguments);
    inPos.set(String(args[0]),args.slice(1,4));

}

function spread(){
    var args = arrayfromargs(arguments);
    if (args.length == 1){
        spreadxyz = [args[0],args[0],args[0]];
    }
    if (args.length == 2){
        spreadxyz = [args[0],0,args[1]];
    }
    if (args.length == 3){
        spreadxyz = [args[0],args[1],args[2]];
    }

}

function spreadInner(){
    var args = arrayfromargs(arguments);
    if (args.length == 1){
        spreadxyzinner = [args[0],args[0],args[0]];
    }
    if (args.length == 2){
        spreadxyzinner = [args[0],0,args[1]];
    }
    if (args.length == 3){
        spreadxyzinner = [args[0],args[1],args[2]];
    }



}
function center(){
    centerpos = arrayfromargs(arguments);

}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl){
    centerpos = [((x/width-1)*2)*2+2,0,-((y/width*2)-1)*2]

    outlet(0,["center", centerpos[0],0,centerpos[2]])

}

function ondrag(x,y,but,cmd,shift,capslock,option,ctrl){
    centerpos = [((x/width-1)*2)*2+2,0,-((y/width*2)-1)*2]
    outlet(0,["center", centerpos[0],0,centerpos[2]])


}

function onresize(w,h)
{
    width = box.rect[2] - box.rect[0];
    if (w!=h) {
		h = w;
		box.size(w,h);
	}
	}



function frameSphere(x,y,z){
	with(sketch){
		

			
			shapeorient(0, 0, 0);
			frameellipse(x,y);
			
			//shapeorient(90, 90, 0);
			//frameellipse(y,z);


			
		}
	
	}
function xyz(){
	var args = arrayfromargs(arguments);
    inPos.set(String(args[0]),args.slice(1,4));
	
	}
	


