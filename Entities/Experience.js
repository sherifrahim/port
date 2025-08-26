{
  "name": "Experience",
  "type": "object",
  "properties": {
    "role": {
      "type": "string"
    },
    "company": {
      "type": "string"
    },
    "startDate": {
      "type": "string",
      "format": "date"
    },
    "endDate": {
      "type": "string",
      "format": "date"
    },
    "description": {
      "type": "string"
    },
    "companyLogoUrl": {
      "type": "string"
    }
  },
  "required": [
    "role",
    "company",
    "startDate"
  ],
  "rls": {
    "read": {},
    "write": {
      "created_by": "{{user.email}}"
    }
  }
}
