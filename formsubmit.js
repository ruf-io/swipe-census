/*
 * jqGoogleForms: a demonstration of the ability to submit a Google Form with jquery and AJAX.
 * DISCLAIMER: This plugin is in no way created nor endorsed by Google Inc. 

               This plugin is provided only as demonstration of a method. The creator 
               does not endorse it's use in place of Google's proprietary interface.

               Use it at your own discretion. Removing Google branding and/or disclaimers 
               may or may not be in violation of Google's Terms of Service. 
               
 * Version: 1.0.0
 * Original author: Corey Walsh
 * Website: http://www.hzldv.com
 * Email: chwalsh@mit.edu
 * Licensed under the MIT license
 */

;(function(e,t,n,r){function u(t,n){o=e.extend({},s,n);if(o.formKey){o["url"]="https://docs.google.com/forms/d/"+o.formKey+"/viewform?embedded=true"}}var i="jqGoogleForms",s={},o={};e.fn[i]=function(t){return this.each(function(n){if(!e.data(this,"plugin_"+i)){e.data(this,"plugin_"+i,new u(this,t))}})};e.fn[i]().sendFormData=function(t){if(o.formKey){e.ajax({url:"https://docs.google.com/forms/d/"+o.formKey+"/formResponse",data:t,type:"POST",dataType:"xml"})}else{console.log("jqGoogleForms: No form key!")}}})(jQuery,window,document)