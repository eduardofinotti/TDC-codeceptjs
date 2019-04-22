
Feature('Login');

Scenario('Login with success', (I) => {

    I.runOnIOS(() => {
        I.waitForElement('~Allow', 10);
        I.tap('~Allow'); 
    });

    I.waitForElement('~próximo', 10);
    I.tap('~próximo');

    I.waitForElement('~iniciar', 10);
    I.tap('~iniciar');

    I.waitForElement('~login_email', 18);
    I.fillField('~login_email', 'eduardo.finotti@deliverymuch.com.br');
    
    I.waitForElement('~login_password', 10);
    I.fillField('~login_password', '123456');      
    I.hideDeviceKeyboard();
    

    I.tap('~button_enter');
    I.wait(2);

    I.runOnIOS(() => {
        I.waitForElement('~cart', 15);
    });

    I.runOnAndroid(() => {
        I.waitForText('Vamos lá! Selecione onde deseja receber seu pedido', 15);
    });
    
});

