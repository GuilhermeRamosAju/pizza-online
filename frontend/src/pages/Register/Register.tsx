import style from "./Register.module.css";
import { BoxBase, Button, FieldText } from "../../components";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Nome: ", name, ", email: ", email, ", senha: ", password);
  };
  return (
    <div className={style.container}>
      <BoxBase>
        <h2>Realizar cadastro</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <FieldText.BaseInput>
            <FieldText.Label label="name">Nome:</FieldText.Label>
            <FieldText.Input
              label="name"
              placeholder="Informe seu nome"
              type="name"
              value={name}
              onChange={handleName}
              required
            />
          </FieldText.BaseInput>
          <FieldText.BaseInput>
            <FieldText.Label label="email">E-mail:</FieldText.Label>
            <FieldText.Input
              label="email"
              placeholder="nome@email.com"
              type="email"
              value={email}
              onChange={handleEmail}
              required
            />
          </FieldText.BaseInput>
          <FieldText.BaseInput>
            <FieldText.Label label="password">Senha:</FieldText.Label>
            <FieldText.Input
              label="password"
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={handlePassword}
              required
            />
          </FieldText.BaseInput>
          <FieldText.BaseInput>
            <FieldText.Label label="confirmPassword">
              Repetir senha:
            </FieldText.Label>
            <FieldText.Input
              label="confirmPassword"
              placeholder="Sua senha"
              type="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />
          </FieldText.BaseInput>
          <Button type="submit">Cadastrar</Button>
        </form>
      </BoxBase>
    </div>
  );
}
