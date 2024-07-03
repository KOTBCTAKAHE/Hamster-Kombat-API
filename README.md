# Сервер комбо карт хомяка

Это проект на Next.js, развернутый на Vercel, который предоставляет API для получения комбо карт хомяка.

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
  "date": "dd-mm-yy"
}
```

### Примеры использования API

#### Python

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

#### JavaScript (Node.js)

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

#### Java

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

#### C#

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

#### Go

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

