import { zodSchemas } from "@/shared/utilities";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components";

const Schema = z.object({
  name: z.string().min(3),
  email: zodSchemas.email(),
  password: zodSchemas.password(),
});

type FormData = z.infer<typeof Schema>;

const fields: { name: keyof FormData }[] = [{ name: "name" }, { name: "email" }, { name: "password" }];

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <div key={field.name}>
          <Input {...register(field.name)} placeholder={field.name} required />
          <Error>{errors[field.name]?.message}</Error>
        </div>
      ))}

      <Submit type="submit" typo="20r24" content="Submit" />
    </Form>
  );
};

const Form = styled.form`
  display: grid;
  gap: 30px;
  width: min(410px, 100%);
`;

const Input = styled.input`
  padding: 15px 10px;
  width: 100%;
  border-radius: 8px;
  border-color: transparent;

  &::placeholder {
    &::first-letter {
      text-transform: uppercase;
    }
  }
`;

const Error = styled.p`
  margin-block-start: 6px;
  color: var(--red);
  font-size: 12px;
`;

const Submit = styled(Button)`
  padding: 12px 10px;
  background-color: orange;
  margin-block-start: 20px;
  color: var(--white);
  border-radius: 8px;

  &:hover {
    background-color: #ffa600ab;
  }
`;
