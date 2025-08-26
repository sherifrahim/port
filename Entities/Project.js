{
  "name": "Project",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "imageUrl": {
      "type": "string"
    },
    "projectUrl": {
      "type": "string"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "title",
    "description"
  ],
  "rls": {
    "read": {},
    "write": {
      "created_by": "{{user.email}}"
    }
  }
}
