/*
	CIML(Canvas Image Manipulator Library) webkit-compatible,firefox>30
	version 0.2.1
	2014 | Gema Ulama Putra (cybermujahidz@gmail.com)

	****************** DISCLAIMER ******************

	HTML CIML(Canvas Image Manipulation Library)
	Copyright (C) 2014  Gema Ulama Putra

	Licensed under GNU General Public Licenses

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	****************** END OF DISCLAIMER ******************
 */
function CIML(canvas,x,y,w,h){
	var kanvas=document.getElementById(canvas);
	kanvas.crossOrigin = 'anonymous';
	this.image=kanvas.getContext("2d");
	this.idata=this.image.getImageData(x,y,w,h);
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.inRange=function(px,py){
		if(px>=0 && py>=0 && px<=this.w && py<this.h){
			return true;
		}else{
			return false;
		}
	}
	this.getPixel=function(px,py){
		var arr=Array();
		var i=((py*this.idata.width)+px)*4;
		arr[0]=this.idata.data[i+0];
		arr[1]=this.idata.data[i+1];
		arr[2]=this.idata.data[i+2];
		arr[3]=this.idata.data[i+3];
		return arr;
	}
	this.setPixel=function(px,py,arr){
		var i=((py*this.idata.width)+px)*4;
		this.idata.data[i+0]=arr[0];
		this.idata.data[i+1]=arr[1];
		this.idata.data[i+2]=arr[2];
		this.idata.data[i+3]=arr[3];
	}
	this.grayscale=function(){
		for(var y=0;y<this.h;y++){
			for(var x=0;x<this.w;x++){
				tmp=this.getPixel(x,y);
				var gs=((tmp[0]+tmp[1]+tmp[2])/3);
				tmp[0]=gs;
				tmp[1]=gs;
				tmp[2]=gs;
				this.setPixel(x,y,tmp);
			}
		}
	}
	this.binary=function(sp){
		if(sp==undefined)sp=128;
		for(var y=0;y<this.h;y++){
			for(var x=0;x<this.w;x++){
				tmp=this.getPixel(x,y);
				var gs=(((tmp[0]+tmp[1]+tmp[2])/3)<sp)?0:255;
				tmp[0]=gs;
				tmp[1]=gs;
				tmp[2]=gs;
				this.setPixel(x,y,tmp);
			}
		}
	}
	this.invert=function(){
		for(var y=0;y<this.h;y++){
			for(var x=0;x<this.w;x++){
				tmp=this.getPixel(x,y);
				tmp[0]=255-tmp[0];
				tmp[1]=255-tmp[1];
				tmp[2]=255-tmp[2];
				this.setPixel(x,y,tmp);
			}
		}
	}
	//getAvgRect(x,y,<rect size>);
	this.getAvgRect=function(x,y,s){
		var arr=Array(0,0,0,0);
		var fact=0;
		var c=Math.floor(s/2);
		for(var oy=0-c;oy<=c;oy++){
			for(var ox=0-c;ox<=c;ox++){
				var nx=x+ox;
				var ny=y+oy;
				if(this.inRange(nx,ny)){
					var tmp=this.getPixel(nx,ny);
					arr[0]=arr[0]+tmp[0];
					arr[1]=arr[1]+tmp[1];
					arr[2]=arr[2]+tmp[2];
					arr[3]=arr[3]+tmp[3];
					fact++;
				}
			}
		}
		arr[0]=arr[0]/fact;
		arr[1]=arr[1]/fact;
		arr[2]=arr[2]/fact;
		arr[3]=arr[3]/fact;
		return arr;
	}
	this.render=function(cv,x,y,dx,dy,dw,dh){
		if(dx==undefined)dx=0;
		if(dy==undefined)dy=0;
		if(dw==undefined)dw=this.idata.width;
		if(dh==undefined)dh=this.idata.height;
		var hasil2=document.getElementById(cv);
		if(hasil2.width==0 && hasil2.height==0){
			hasil2.width=dw;
			hasil2.height=dh;
		}
		cv=hasil2.getContext("2d");
		cv.putImageData(this.idata,x,y,dx,dy,dw,dh);
	}
}
