#### \$or

Allows conditions to be combined to create more advanced conditions. Would require one conditions to return true otherwise it would fail.

```json
{
  "type": "$or",
  "pattern": [
    {
      "requires": 1,
      "conditions": []
    },
    {
      "requires": 1,
      "conditions": []
    }
  ]
}
```
