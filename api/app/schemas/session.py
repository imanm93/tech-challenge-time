session_schema = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "username": { "type": "string" },
        "time": { "type": "number" },
        "createdAt": { "type": "string", "format": "date-time" }
    },
    "required": [ "name", "username", "time", "createdAt" ],
    "additionalProperties": False
}
