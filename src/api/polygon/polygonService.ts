const apiUrl        = import.meta.env.POLYGON_API_URL + `/credentials`;
const apiUser       = import.meta.env.POLYGON_API_USER;
const apiPassword   = import.meta.env.POLYGON_API_PASSWORD;

async function createCredential(did : string) {

    const basicAuth = 'Basic ' + btoa(apiUser + ':' + apiPassword);
  
    const payload = {
        credentialSchema: "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
        type: "KYCAgeCredential",
        credentialSubject: {
            id: did, 
            birthday: 19960424,
            documentType: 2
        },
        expiration: "2025-04-24T08:20:18.164Z",
        signatureProof: true,
        mtProof: false
    };
  
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth
        },
        body: JSON.stringify(payload)
    };
  
    try {
        const response = await fetch(apiUrl, fetchOptions);
  
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
            return;
        }
  
        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error('Request failed:', error);
    }
  }
  
  async function fetchQrCodeLink(credentialId : string) {
  
    const apiUrlCredential = apiUrl + `${credentialId}/qrcode?type=link`;
  
    const basicAuth = 'Basic ' + btoa(apiUser + ':' + apiPassword);
  
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Authorization': basicAuth
        }
    };
  
    try {
        const response = await fetch(apiUrlCredential, fetchOptions);
  
        if (!response.ok) {
            const errorData = await response.json(); 
            console.error('Error:', errorData.message);
            return;
        }
  
        const data = await response.json();
        console.log('QR Code Link:', data.qrCodeLink);
        return data.qrCodeLink;
    } catch (error) {
        console.error('Request failed:', error);
    }
  }
  