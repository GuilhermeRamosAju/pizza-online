import style from "./Login.module.css"
import { BoxBase, FieldText } from "../../components";

export default function Login() {
  return (
    <div className={style.container}>
      <BoxBase>
        <h2>Entrar</h2>
        <FieldText.BaseInput>
          <FieldText.Label label="email">E-mail:</FieldText.Label>
          <FieldText.Input
            label="email"
            placeholder="nome@email.com"
            type="email"
          />
        </FieldText.BaseInput>
        <FieldText.BaseInput>
          <FieldText.Label label="password">Senha:</FieldText.Label>
          <FieldText.Input
            label="password"
            placeholder="Sua senha"
            type="password"
          />
        </FieldText.BaseInput>
      </BoxBase>
    </div>
  );
}
