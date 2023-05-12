'use strict';

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);

  const params = {
    ClientId: process.env.client_id,
    Username: email
  };

  try {
    // Iniciar el flujo de recuperación de contraseña
    const response = await cognito.forgotPassword(params).promise();

    // La respuesta puede contener información adicional, como el código de entrega
    // que se envía al usuario para verificar la solicitud de recuperación de contraseña.
    // Puedes manejar esa información de acuerdo a tus necesidades.

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Se ha iniciado el proceso de recuperación de contraseña' })
    };
  } catch (error) {
    console.error('Error al iniciar el proceso de recuperación de contraseña:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Ocurrió un error al iniciar el proceso de recuperación de contraseña' })
    };
  }
};
