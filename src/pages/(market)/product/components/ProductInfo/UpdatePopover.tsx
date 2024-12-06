import { useMutation } from "@tanstack/react-query";
import { deleteProducts } from "api/product";
import kebabIcon from "assets/icons/ic_kebab.svg";
import classNames from "classnames/bind";
import Popover from "components/Popover";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../../Product.module.scss";

const cx = classNames.bind(styles);

export default function UpdatePopover() {
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!id) return null;
      return deleteProducts(Number(id));
    },
    onSuccess: () => {
      navigate("/market");
    },
  });

  return (
    <Popover.Root>
      <Popover.Trigger>
        <img src={kebabIcon} alt="kebab" />
      </Popover.Trigger>

      <Popover.Content position="right">
        <ul className={cx("popover-content")}>
          <li>
            <button type="button" onClick={() => navigate(`/edit-item/${id}`)}>
              수정하기
            </button>
          </li>
          <li>
            <button type="button" onClick={() => deleteMutation.mutate()}>
              삭제하기
            </button>
          </li>
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}
