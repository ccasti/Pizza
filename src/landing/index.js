var yo = require('yo-yo');

module.exports = function landing (box) {
	return yo`<div class="container">
    	<div class="row">
    	    <div class="col s10 push-s1">
     	       <div class="row">
      		        ${box}
            	</div>
        	</div>
    	</div>
	</div>`
}