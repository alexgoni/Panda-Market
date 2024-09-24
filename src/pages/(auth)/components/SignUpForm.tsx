import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "api/auth";
import { ReactComponent as HomeIcon } from "assets/icons/ic_home.svg";
import classNames from "classnames/bind";
import Button from "components/Button";
import Form from "components/Form";
import Input from "components/Input";
import { useUserContext } from "context/user";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HttpError from "utils/HTTPClient/HTTPError";
import { setCookie } from "utils/cookie";
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from "utils/variables";

import styles from "../Auth.module.scss";

const cx = classNames.bind(styles);

export default function SignUpForm() {
  const [formValue, setFormValue] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate();
  const { setUserInfo } = useUserContext();
  const mutation = useMutation({
    mutationFn: postSignUp,
    onSuccess: (response) => {
      navigate("/");

      setCookie({
        name: "accessToken",
        value: response.accessToken,
        time: ACCESS_TOKEN_TIME,
      });
      setCookie({
        name: "refreshToken",
        value: response.refreshToken,
        time: REFRESH_TOKEN_TIME,
      });
      setUserInfo(response.user);
    },
    onError: async (error: HttpError) => {
      if (error.response) {
        const body = await error.response.json();
        alert(body.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ ...formValue });
  };

  return (
    <div className={cx("form-container")}>
      <h1>SIGN UP</h1>
      <span className={cx("subtitle")}>thank you for joining us!</span>
      <Link to="/" className={cx("home-icon")}>
        <HomeIcon fill="#4b5563" width={24} height={24} />
      </Link>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={formValue.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="nickname">닉네임</label>
        <Input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={formValue.nickname}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">비밀번호</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={formValue.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="password-confirmation">비밀번호</label>
        <Input
          id="password-confirmation"
          name="passwordConfirmation"
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          value={formValue.passwordConfirmation}
          onChange={handleChange}
          required
        />

        <span className={cx("link-block")}>
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </span>

        <Button type="submit" width="100%" height="40px" round>
          회원가입
        </Button>
      </Form>
    </div>
  );
}
