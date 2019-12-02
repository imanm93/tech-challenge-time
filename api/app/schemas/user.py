user_schema = {
    "type": "object",
    "properties": {
        "username": { "type": "string" },
        "password": { "type": "string", "minLength": 5 }
    },
    "required": [ "username", "password" ],
    "additionalProperties": False
}
