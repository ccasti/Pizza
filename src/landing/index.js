var yo = require('yo-yo');

module.exports = function landing (box) {
	return yo`<div class="container">
    	<div class="row">
    	    <div class="col s12">
     	       <div class="row landing-fondo">
      		        ${box}
            	</div>
        	</div>
    	</div>
	</div>`
}