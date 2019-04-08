/*
La licencia MIT (MIT)

Copyright (c) 2019 Concomsis S.A. de C.V.

Por la presente se otorga el permiso, sin cargo, a cualquier persona que obtenga una copia de
este software y los archivos de documentación asociados (el "Software"), para tratar en
el Software sin restricciones, incluidos, entre otros, los derechos de
usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y / o vender copias de
el Software, y para permitir que las personas a quienes se suministra el Software lo hagan,
sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las
Copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O
IMPLÍCITOS, INCLUIDOS, PERO NO LIMITADOS A LAS GARANTÍAS DE COMERCIABILIDAD, APTITUD
PARA UN PROPÓSITO PARTICULAR Y NO INCUMPLIMIENTO. EN NINGÚN CASO LOS AUTORES O
LOS TITULARES DEL DERECHO DE AUTOR SERÁN RESPONSABLES POR CUALQUIER RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, SI
EN UNA ACCIÓN DE CONTRATO, CORTE O DE OTRA MANERA, DERIVADO DE, FUERA O EN
CONEXIÓN CON EL SOFTWARE O EL USO U OTRAS REPARACIONES EN EL SOFTWARE.
*/
'use strict';
/////////////////////// CON FIREBASE


//alert("hola");
// Initialize Firebase

/* function getParameterByName(name,url){
  if(!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)│&│#│$)"),
  results = regex.exec(url);
  if(!results) return null;
  if(!results[2])return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Handlebars.registerHelper("formatName", function(property1, property2){
  return new Handlebars.SafeString(
    "Hello my name is <strong>" + property1 + "</strong> and I live a  <strong>t " + property2
  )
})


$.ajax("./data/cast.json").done(function(cast){
  if ($("body").hasClass("page-cast-details")) {
    $characterList.html(compiledCharacterTemplate(cast.characters[characterId]));
  }else{
    $characterList.html(compiledCharacterTemplate(cast));
  }
}); */


const functions = require('firebase-functions');
//const admin = require('firebase-admin');
//admin.initializeApp();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const express = require('express');
const app = express();
const jmy = require('comsis_jmy');
const engines = require('consolidate');
const firebase = require('firebase-admin');
/////////////////////////////

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

function getFacts(){
  const ref = firebaseApp.database().ref('facts');
  return ref.once('value').then(snap =>snap.val());
}



app.engine('hbs', engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');


/* 
const acceso = {
  servidor:"https://us-central1-encouraging-mix-111109.cloudfunctions.net/da/",
  eid:"JC_EMPRESA",
  uid:"jc",
  token:"boscotronZXCTOKEN"
};

 jmy.token([],acceso).then(function(e){
    console.log("token",e);  
  });


 */
  /* 

  jmy.guardar([{
    tabla:"tabla_extra",
    api:"APIKEY",
    id:"BSK",
    guardar:{"campo1":"Ola k hace","campo2":"hola!","campo3":" :D "}
  }],acceso).then(function (e) {
    for(let p of e){
      p=p.jmy_guardar;
      console.log("guardar",p, "[[ EL ID ES: "+p.out.cabecera.id+"]]");  
    }

    jmy.ver([{
      tabla:"tabla_extra",
      api:"APIKEY",
      col:["campo3"]
    }],acceso).then(function (e) {  
      for(let p of e){
        p=p.jmy_ver;
        console.log("ver",p.ot, "[[ EL ID ES: "+p.id_f+"]]");  
      }
    });

  }); */



/* 
  jmy.ver_empresa([{
    eid: "JC_EMPRESA",
    estado: "2",
    datos:{
      "tablas":[
        {
          "nombre": "registro_timeline",
          "entrada": "1",
          "salida": "0"
        },
        {
          "nombre": "tabla_extra",
          "entrada": "1",
          "salida": "0"
        },
        {
          "nombre": "registro_de_pagos",
          "entrada": "1",
          "salida": "0"
        }     
      ]}
  }],acceso).then(function(res){
    console.log(
      res[0].jmy_emp.out.datos,
      res[0].jmy_emp.out.datos.datos.tablas
      );  
  });
  
  jmy.db([{eid:"MARCELO_EMPRESA"}],acceso).then(function (e) {
    console.log("DB",e);
  }); */




/* 
app.post('/ver', async (req, res) => {
  const ver = req.body;
  try {
    console.log(ver);
    res.status(201).json(ver);
  } catch(error) {
    console.log('Error detecting sentiment or saving message', error.message);
    res.sendStatus(500);
  }
}); */

/* app.get('/timestamp',(request,response)=>{
  response.send(`${Date.now()}`);
});
 */
app.get('/', (request,response)=>{
  response.set('Cache-Control','public, max-age-300, s-maxage-600');
  getFacts().then(facts => {
  response.render('index', { facts });
  });  
});

app.get('/facts.json',(request,response)=>{
  response.set('Cache-Control','public, max-age-300, s-maxage-600');
  getFacts().then(facts => {
    response.json(facts);
  });  
});

app.get('/juan',(request,response)=>{
  response.send("H");
var data = data;
  function juan(nombre,data) {
    var nombre = nombre;
   
    console.log(data+nombre+"holaXD");
  }
  var juan = juan("juanC ");
  

});

// Expose the API as a function
exports.app = functions.https.onRequest(app);

/* exports.api = functions.https.onRequest((request, response)=>
{
  response.send("Hello JuanC");
}); */

