class Template {
  
  build(state){
    return {
      "formatVersion":1,
      "teamIdentifier":"X25S8G68GV",
      "description":"Campaña SARS-CoV-2",
      "foregroundColor":"#000000",
      "barcodes":[
        {
          "message":state.barcodeURL,
          "format":"PKBarcodeFormatQR",
          "messageEncoding":"iso-8859-1"
        }
      ],
      "serialNumber":`pass.ma.covid-vaccine-id:PKBarcodeFormatQR:${state.user.id.replace(/\s+/g, '-')}`,
      "backgroundColor":"#FEFFFF",
      "labelColor":"#428744",
      "barcode":{
        "message":state.barcodeURL,
        "format":"PKBarcodeFormatQR",
        "messageEncoding":"iso-8859-1"
      },
      "voided":false,
      "generic":{
        "headerFields":[
          
        ],
        "primaryFields":[
          {
            "key":"person-name",
            "label":"Nombre Completo",
            "value":state.user.name
          }
        ],
        "auxiliaryFields":[
          {
            "key":"vaccination-scheme",
            "label":"Esquema",
            "value":state.user.kind
          }
        ],
        "backFields":[
          {
            "label":"Sobre este pase de movilidad",
            "key":"disclaimer",
            "value":"Este pase fue generado automáticamente a partir de un Comprobante de Vacunación o un Pase Digital de Vacunación de Chile. La información contenida en este pase no se almacena en ningún lugar más que en el pase mismo. No se asume ninguna obligación o responsabilidad por cualquier error u omisión que figure en el contenido del pase y se declina cualquier tipo de responsabilidad por daños en relación con la utilización del mismo."
          },
          {
            "attributedValue":"Hecho en Chile por <a href=\"https:\/\/matias.ma\">Matías<\/a>",
            "label":"Créditos",
            "key":"credits",
            "value":"Hecho en Chile por Matías"
          }
        ],
        "secondaryFields":[
          {
            "key":"person-id",
            "label":"N° de Documento",
            "value":state.user.id
          },
          {
            "key":"person-born-at",
            "label":"Fecha de Nacimiento",
            "value":state.user.born
          }
        ]
      },
      "logoText":"Pase Digital de Vacunación",
      "organizationName":"Ministerio de Salud",
      "passTypeIdentifier":"pass.ma.matias.covid-vaccine-id"
      }
  }
  
}

export default Template;
