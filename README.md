# html5-CIML
Image processing using html5 canvas and javascript

##Usage
After CIML.js included into html, you can create CIML object with following parameters :<br>
CIML(canvas id **string**,left-most x **int**,top-most y **int**,width **int**,height **int**);
```
<canvas id=source></canvas>
<script type=text/javascript>
var sourceCanvas=document.getElementById('source');
var sourceImg=new CIML('source',0,0,sourceCanvas.width,sourceCanvas.height);
</script>
```
above code creates a CIML object as **sourceImg** variable, which loads whole canvas.
>note that the canvas should have already contain an image to be displayed or the width and the height should have already defined to make a blank image. You can use drawImage on a canvas object.

###Getting pixel data from x,y coordinate
A pixel data is an array containing 4 elements of integer (0-255) which represent R,G,B,A in order.
To get a pixel data, use:<br>
getPixel(x,y);
```
var pixel=sourceImg.getPixel(0,0);
```
variable "pixel" now contain top-left-most pixel data. So **pixel[0]** should be the value of RED and so on.

###Setting a pixel data of x,y coordinate
To set a pixel data, use:<br>
setPixel(x,y,data **array**);
```
var foo=Array(255,0,0,255);
sourceImg.setPixel(0,0,foo);
```
will change top-left-most pixel into solid red.

###Grayscale, Binary & Invert
```
sourceImg.grayscale();
```
will turn whole image into grayscale.
```
sourceImg.binary(128);
```
will turn whole image into binary(black-white), with an integer (0-255) parameter as the threshold value. Default value is 128.
```
sourceImg.invert();
```
will invert the color of whole image.

###Render processed image
You can render/draw processed image into a new canvas or the source canvas using:<br>
render(canvas id **string**,start x **int**,start y **int**);<br>
or just a portion of it(optional):<br>
render(canvas id **string**,start x **int**,start y **int**,dirty x **int**,dirty y **int**,dirty width **int**,dirty height **int**);<br>
```
sourceImg.render('source',0,0);
```
will redraw the source canvas.
