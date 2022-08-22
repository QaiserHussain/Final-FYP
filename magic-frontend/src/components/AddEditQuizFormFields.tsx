import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import { useFormikContext } from "formik";
import ChipInput from "material-ui-chip-input";
import { IQuiz } from "../shared/interfaces";

export const AddEditQuizFormFields = ({ id }: { id?: string }) => {
  const { touched, errors, values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<IQuiz>();
    const name = 'selectedOption'
    enum Options {
      "create",
    "generate",
    }
  return (
    <>
      <div className="">
        <TextField
          fullWidth
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.title && errors.title)}
          helperText={touched.title && errors.title}
          id="title"
          label="Title"
          variant="outlined"
        />
      </div>

      <div className="mt-6">
        <TextField
          multiline
          fullWidth
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.description && errors.description)}
          helperText={touched.description && errors.description}
          id="description"
          label="Description"
          variant="outlined"
        />
      </div>
      <div className="mt-6">
        <TextField
          multiline
          fullWidth
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.category && errors.category)}
          helperText={touched.category && errors.category}
          id="category"
          label="Category"
          variant="outlined"
        />
      </div>
      {id && (
        <div className="mt-6">
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="authentication-label"
              id="select-authentication"
              fullWidth
              value={values.status}
              label="Status"
              onChange={(e) => {
                setFieldValue(`status`, e.target.value);
              }}
            >
              <MenuItem value={"active"}>Active</MenuItem>
              <MenuItem value={"inactive"}>Inactive</MenuItem>
              <MenuItem value={"draft"}>Draft</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      <div className="mt-6">
        <ChipInput
          size="medium"
          label="Tags"
          fullWidth
          variant="outlined"
          className="mt-6 mr-10"
          placeholder="Enter tags and hit ENTER"
          allowDuplicates={false}
          error={!!(touched.tags && errors.tags)}
          helperText={touched.tags && errors.tags}
          alwaysShowPlaceholder={!!values.tags.length}
          value={values.tags}
          onAdd={(chip) => {
            setFieldValue("tags", values.tags.concat(chip));
          }}
          onDelete={(chip, indexChip) => {
            const tags = values.tags.filter((_, i) => i !== indexChip);
            setFieldValue("tags", tags);
          }}
        />
      </div>
      <div className="mt-6">
        <TextField
          multiline
          fullWidth
          value={values.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.quantity && errors.quantity)}
          helperText={touched.quantity && errors.quantity}
          id="quantity"
          label="Quantity"
          variant="outlined"
        />
      </div>
      <div className="mt-6">
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name={name} 
          value={values.selectedOption.toString()} onChange={(event) => {
            setFieldValue(name, event.currentTarget.value)}}
            defaultValue={Options.create.toString()}
        >
          <FormControlLabel value={Options.create.toString()}  control={<Radio />} label="Create" />
          <FormControlLabel value={Options.generate.toString()}  control={<Radio />} label="Generate" />
        </RadioGroup>
        {/* <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Generate Quiz | Create QUiz"
          name="radio-buttons-group"
          row
        >
          <FormControlLabel value={values.generate} onChange={handleChange} control={<Radio />} label="Generate" />
          <FormControlLabel value={values.create} onChange={handleChange} control={<Radio />} label="Create" />
        </RadioGroup> */}
      </div>
    </>
  );
};
