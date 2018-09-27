
# CosmoLit

---

Name: Fiori Gebrekidan

Date: November 17, 2017

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Name            `Type: String`
- `Field 2`: Type            `Type: String`
- `Field 3`: Rating          `Type: Number`
- `Field 4`: Cost            `Type: Number`
- `Field 5`: Description     `Type: String`
- `Field 6`: Duration of Use in Months       `Type: Number`
- `Field 7`: Skin Type  `Type: [String]`

Schema:
```javascript
{
  name: {
      type: String,
      required: true
  },
  type: {
    type: String
    required: false
  },
  rating: {
      type: Number,
      required: true
  },
  cost: {
      type: Number,
      required: false
  },
  description: {
      type: String,
      required: false
  },
  duration: {
      type: Number,
      required: false
  },
  skin_type: [String]
}
```

### 2. Add New Data

HTML form route: `/product`

POST endpoint route: `/`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      name: 'Pixie Glow Tonic',
      type: 'Toner'
      rating: 5,
      cost: 29,
      description: "Exfoliating Toner"
      duration: 5
      skin_type: ["Dry", "Irritable"]
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/products`

### 4. Search Data

Search Field: `name`

### 5. Navigation Pages

Navigation Filters
1. Alphabetical -> `/alphabetical`
2. Sorted by Ratings -> `/ratings`
3. Random Product -> `/random`
4. Sorted by Cost -> `/cost`
5. Sorted by Duration of Use -> `/duration`
6. All Products -> `/`
