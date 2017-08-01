/**
 * SMS functions
 * @param app Express aplication
 * @returns {{send: send, sendActivationCode: sendActivationCode}}
 */
module.exports = function(app){
    const plivo = require('plivo');
    
    return {
        /**
         * Default method to send sms
         * Only in production environment
         * @author Cassiano Vellames <c.vellames@outlook.com<
         * @param dst Number destiny
         * @param txt Text to send
         */
        send: function(dst, txt){

            if(app.core.server.ENVIRONMENT.toLowerCase() != "production"){
                console.log("Message only sent in production environment");
                return;
            }
            return;
            var p = plivo.RestAPI({
              authId: app.core.plivo.AUTH_ID,
              authToken: app.core.plivo.AUTH_TOKEN
            });

            var params = {
                'src': app.core.plivo.SRC_NUMBER,
                'dst' : dst,
                'text' : txt
            };
            p.send_message(params, function (status, response) {
                console.log('Status: ', status);
                console.log('API Response:\n', response);
            });
        },

        /**
         * Send an sms with the activation code to number
         * @author Cassiano Vellames <c.vellames@outlook.com>
         * @param dst Number destiny
         * @param activationCode Activation code
         */
        sendActivationCode: function(dst, activationCode){
            const plivoMsg = "Hi, to advance in your registration, please insert the following activation code in aplication: " + activationCode;
            this.send(dst, plivoMsg);
        }
    }
}