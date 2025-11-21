export const codeExamples = {
  Python: `import requests
from requests.auth import HTTPBasicAuth

apiKey = 'your_api_key'
apiSecret = 'your_api_secret'

basic = HTTPBasicAuth(apiKey, apiSecret)

sendRequest = {
    "messages": [
        {
            "content": "Hello SMS World from Python",
            "destination": ">>Your test phone number<<"
        }
    ]
}

try:
    sendResponse = requests.post(
        "https://rest.smsportal.com/bulkmessages",
        auth=basic,
        json=sendRequest
    )

    if sendResponse.status_code == 200:
        print("Success:")
        print(sendResponse.json())
    else:
        print("Failure:")
        print(sendResponse.json())
except Exception as e:
    print(e)`,
  "Node.js": `const axios = require('axios');

let apiKey = 'your_api_key';
let apiSecret = 'your_api_secret';
let accountApiCredentials = apiKey + ':' + apiSecret;

let buff = new Buffer.from(accountApiCredentials);
let base64Credentials = buff.toString('base64');

let requestHeaders = {
    headers: {
        'Authorization': \`Basic \${base64Credentials}\`,
        'Content-Type': 'application/json'
    }
};

let requestData = JSON.stringify({
    messages: [{
        content: "Hello SMS World from NodeJS",
        destination: ">>Your test phone number<<"
    }]
});

axios.post('https://rest.smsportal.com/bulkmessages', 
    requestData, 
    requestHeaders)
    .then(response => {
        if (response.data) {
            console.log("Success:");
            console.log(response.data);
        }
    })
    .catch(error => {
        if (error.response) {
            console.log("Failure:");
            console.log(error.response.data);
        }
    });`,
  PHP: `<?php
$apiKey = 'your_api_key';
$apiSecret = 'your_api_secret';
$accountApiCredentials = $apiKey . ':' . $apiSecret;

$base64Credentials = base64_encode($accountApiCredentials);
$authHeader = 'Authorization: Basic ' . $base64Credentials;

$sendData = '{ "messages" : [ { 
    "content" : "Hello SMS World from PHP", 
    "destination" : ">>Your test phone number<<" 
} ] }';

$options = array(
    'http' => array(
        'header' => array(
            "Content-Type: application/json", 
            $authHeader
        ),
        'method' => 'POST',
        'content' => $sendData,
        'ignore_errors' => true
    )
);

$sendResult = file_get_contents(
    'https://rest.smsportal.com/bulkmessages',
    false,
    stream_context_create($options)
);

if ($status === '200') {
    echo "Success:\\n";
    var_dump($sendResult);
}`,
  Ruby: `require 'net/https'
require 'uri'

apiKey = 'your_api_key'
apiSecret = 'your_api_secret'

uri = URI.parse("https://rest.smsportal.com/bulkmessages")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

sendRequestBody = '{
    "messages": [{
        "content": "Hello SMS World from Ruby",
        "destination": ">>Your test phone number<<"
    }]
}'

request = Net::HTTP::Post.new(uri.request_uri)
request.basic_auth(apiKey, apiSecret)
request.body = sendRequestBody
request.content_type = 'application/json'

sendResponse = http.request(request)

if sendResponse.code == '200'
    puts 'Success:'
    puts sendResponse.body
else
    puts 'Failure:'
    puts sendResponse.body
end`,
  Java: `import java.util.Base64;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class JavaExample {
    public static void main(String[] args) {
        String apiKey = "your_api_key";
        String apiSecret = "your_api_secret";
        String credentials = apiKey + ":" + apiSecret;

        String base64Credentials = Base64
            .getEncoder()
            .encodeToString(credentials.getBytes());

        HttpClient client = HttpClient.newHttpClient();
        String requestBody = "{ \\"messages\\" : [ { " +
            "\\"content\\" : \\"Hello SMS World from Java\\", " +
            "\\"destination\\" : \\">>Your test phone number<<\\" " +
        "} ] }";
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(new URI("https://rest.smsportal.com/BulkMessages"))
            .header("Authorization", "Basic " + base64Credentials)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();
    }
}`,
  "C#": `using System.Net.Http.Headers;
using System.Text;

public class Program
{
    public static async Task Main()
    {
        var apiKey = "your_api_key";
        var apiSecret = "your_api_secret";
        
        var apiCredentials = Convert.ToBase64String(
            Encoding.UTF8.GetBytes($"{apiKey}:{apiSecret}")
        );

        var jsonSendRequest = "{ \\"messages\\" : [ { " +
            "\\"content\\" : \\"Hello SMS World from C#\\", " +
            "\\"destination\\" : \\">>Your test phone number<<\\" " +
        "} ] }";

        using var httpClient = new HttpClient();

        var request = new HttpRequestMessage(
            HttpMethod.Post, 
            "https://rest.smsportal.com/BulkMessages"
        ) {
            Content = new StringContent(
                jsonSendRequest, 
                Encoding.UTF8, 
                "application/json"
            )
        };
        
        request.Headers.Authorization = 
            new AuthenticationHeaderValue("Basic", apiCredentials);
    }
}`,
  GO: `package main

import (
    "bytes"
    b64 "encoding/base64"
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    var apiKey string = "your_api_key"
    var apiSecret string = "your_api_secret"

    credentials := b64.StdEncoding.EncodeToString(
        []byte(apiKey + ":" + apiSecret)
    )

    client := &http.Client{}

    jsonSendRequest := \`{
        "messages" : [{
            "content" : "Hello SMS World",
            "destination" : ">>Your test phone number<<"
        }]
    }\`

    req, _ := http.NewRequest(
        "POST",
        "https://rest.smsportal.com/bulkmessages",
        bytes.NewBuffer([]byte(jsonSendRequest))
    )
    
    req.Header.Add("Content-Type", "application/json")
    req.Header.Add("Authorization", 
        fmt.Sprintf("Basic %s", credentials))

    resp, err := client.Do(req)
}`,
};

export const features = [
  {
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&h=400&fit=crop",
    title: "Keng ko‘lamli",
    highlight: "Xabar Yetkazish",
    description:
      "Bir vaqtning o‘zida 10 000+ xabar yuboring — tezkor yoki rejalashtirilgan, shaxsiylashtirilgan mass-xabarlar.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    title: "Kontaktlar va",
    highlight: "Oson Boshqaruv",
    description:
      "Kontaktlarni yuklang, segmentlang va API orqali tizimlarga ulang — jarayonlarni avtomatlashtiring.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    title: "Aniq va Real vaqt",
    highlight: "Analitika",
    description:
      "Hisobotlar, statistikalar va kampaniya samaradorligini to‘liq tahlil qiling.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    title: "Sanoat bo‘yicha",
    highlight: "Yechimlar",
    description:
      "Ta’lim, xizmat ko‘rsatish, bank-moliya va muddatli to‘lov do‘konlari uchun maxsus imkoniyatlar.",
  },
];
