# Work In Progress 

# Сервер комбо карт хомяка

Это проект на Next.js, развернутый на Vercel, который предоставляет API для получения комбо карт хомяка.

![GitHub Repo Stars](https://img.shields.io/github/stars/KOTBCTAKAHE/hamster-kombo-server?style=social)
![GitHub Forks](https://img.shields.io/github/forks/KOTBCTAKAHE/hamster-kombo-server?style=social)
![GitHub Issues](https://img.shields.io/github/issues/KOTBCTAKAHE/hamster-kombo-server)
![GitHub License](https://img.shields.io/github/license/KOTBCTAKAHE/hamster-kombo-server)

## Навигация

- [Установка и запуск](#установка-и-запуск)
  - [Требования](#требования)
  - [Установка](#установка)
  - [Запуск](#запуск)
- [API](#api)
  - [Получение комбо карт](#получение-комбо-карт)
- [Примеры использования API](#примеры-использования-api)
  - [Python](#python)
  - [JavaScript (Node.js)](#javascript-nodejs)
  - [Java](#java)
  - [C#](#c)
  - [Go](#go)
  - [Flutter (Dart)](#flutter-dart)
- [Статистика репозитория](#статистика-репозитория)
- [Поддержите меня](#поддержите-меня)

## Установка и запуск

### Требования

- Node.js (версия 12.x или выше)
- npm (версия 6.x или выше)

### Установка

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/KOTBCTAKAHE/hamster-kombo-server
    cd hamster-kombo-server
    ```

2. Установите зависимости:

    ```bash
    npm install
    ```

### Запуск

1. Запустите сервер разработки:

    ```bash
    npm run dev
    ```

2. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## API

### Получение комбо карт

**URL:** `/api/GetCombo`

**Метод:** `GET`

**Пример ответа:**

```json
{
  "combo": ["card1", "card2", "card3"],
  "expired": "**********" 
}
```

## Примеры использования API

### Python

```python
import requests

url = "https://hamster-kombo-server.vercel.app/api/GetCombo"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    combo = data["combo"]
    date = data["date"]
    print(f"Combo: {combo}")
    print(f"Date: {date}")
else:
    print(f"Error: {response.status_code}")
```

### JavaScript (Node.js)

```javascript
const fetch = require('node-fetch');

const url = 'https://hamster-kombo-server.vercel.app/api/GetCombo';

fetch(url)
    .then(response => response.json())
    .then(data => {
        const combo = data.combo;
        const date = data.date;
        console.log(`Combo: ${combo}`);
        console.log(`Date: ${date}`);
    })
    .catch(error => console.error('Error:', error));
```

### Java

```java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://hamster-kombo-server.vercel.app/api/GetCombo");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();

            JsonObject json = JsonParser.parseString(content.toString()).getAsJsonObject();
            String combo = json.getAsJsonArray("combo").toString();
            String date = json.get("date").getAsString();
            System.out.println("Combo: " + combo);
            System.out.println("Date: " + date);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### C#

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

class Program
{
    private static async Task Main(string[] args)
    {
        using (HttpClient client = new HttpClient())
        {
            HttpResponseMessage response = await client.GetAsync("https://hamster-kombo-server.vercel.app/api/GetCombo");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            JObject data = JObject.Parse(responseBody);
            JArray combo = (JArray)data["combo"];
            string date = (string)data["date"];

            Console.WriteLine($"Combo: {combo}");
            Console.WriteLine($"Date: {date}");
        }
    }
}
```

### Go

```go
package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type Response struct {
    Combo []string `json:"combo"`
    Date  string   `json:"date"`
}

func main() {
    resp, err := http.Get("https://hamster-kombo-server.vercel.app/api/GetCombo")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    var data Response
    if err := json.Unmarshal(body, &data); err != nil {
        fmt.Println("Error:", err)
        return
    }

    fmt.Printf("Combo: %v\n", data.Combo)
    fmt.Printf("Date: %s\n", data.Date)
}
```

### Flutter (Dart)

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

void fetchCombo() async {
  final url = 'https://hamster-kombo-server.vercel.app/api/GetCombo';
  final response = await http.get(Uri.parse(url));

  if (response.statusCode == 200) {
    final data = json.decode(response.body);
    final combo = data['combo'];
    final date = data['date'];
    print('Combo: $combo');
    print('Date: $date');
  } else {
    print('Error: ${response.statusCode}');
  }
}
```

Эти примеры демонстрируют, как сделать GET-запрос к API сервера комбо карт хомяка, обработать ответ и вывести значения `combo` и `date` на различных языках программирования.

## Статистика репозитория

![GitHub Repo Size](https://img.shields.io/github/repo-size/KOTBCTAKAHE/hamster-kombo-server)
![GitHub Last Commit](https://img.shields.io/github/last-commit/KOTBCTAKAHE/hamster-kombo-server)
![GitHub Language Count](https://img.shields.io/github/languages/count/KOTBCTAKAHE/hamster-kombo-server)
![GitHub Top Language](https://img.shields.io/github/languages/top/KOTBCTAKAHE/hamster-kombo-server)

![GitHub Contributors](https://img.shields.io/github/contributors/KOTBCTAKAHE/hamster-kombo-server)
![GitHub Watchers](https://img.shields.io/github/watchers/KOTBCTAKAHE/hamster-kombo-server?style=social)

## Поддержите меня

Если вам нравится этот проект, пожалуйста, поддержите меня, поставив звезду на [GitHub репозитории](https://github.com/KOTBCTAKAHE/hamster-kombo-server).
