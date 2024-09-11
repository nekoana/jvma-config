import "./App.css";
import { Form } from "@rjsf/material-ui";
import {Button} from "@material-ui/core";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { FormEvent } from "react";

const schema: RJSFSchema = {
  type: "array",
  items: {
    type: "object",
    title: "JVMA CONFIG",
    properties: {
      app_id: {
        type: "string",
        title: "App ID",
        enum: ["jp.gmofg.app"],
      },

      bind_brand: {
        type: "array",
        title: "Bind Brand",
        items: {
          type: "object",
          properties: {
            brand_id: {
              type: "integer",
              uniqueItems: true,
            },
            brand_name: {
              type: "string",
            },
            display_icon: {
              type: "string",
            },
            display_name: {
              type: "string",
            },
            business_category: {
              type: "string",
              enum: ["00", "10", "30", "72"],
            },
          },
          additionalProperties: false,
          required: [
            "brand_id",
            "brand_name",
            "display_name",
            "business_category",
          ],
        },
      },
    },
    additionalProperties: false,
    required: ["app_id", "bind_brand"],
  },
};

const uiSchema: UiSchema = {
  "ui:options": {
    removable: true,
    orderable: false,
    addable: true,
  },
};

const onSubmit = (data: any, event: FormEvent<any>) => {
  const jsonString = JSON.stringify(data.formData);
  console.log("Data submitted: ", jsonString);

  // Create a Blob with the JSON data
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Create a link element and trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function App() {
  return (
    <div className="App">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={onSubmit}
      >
        <div className="Submit">
          <Button variant="contained" type="submit">
            Download
          </Button>
        </div>
      </Form>
    </div>
  );
}
