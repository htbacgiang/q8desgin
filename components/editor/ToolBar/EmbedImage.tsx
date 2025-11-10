import { FC, useState } from "react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Button from "../ToolBar/Button";

interface Props {
  onSubmit(url: string, alt?: string): void;
}

const EmbedImage: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    if (!url.trim()) return hideForm();

    onSubmit(url, alt || "");
    setUrl("");
    setAlt("");
    hideForm();
  };

  const hideForm = () => setVisible(false);
  const showForm = () => setVisible(true);

  return (
    <div
      onKeyDown={({ key }) => {
        if (key === "Escape") hideForm();
      }}
      className="relative"
    >
      <Button onClick={visible ? hideForm : showForm}>
        <BsBoxArrowInUpRight />
      </Button>

      {visible && (
        <div className="absolute top-full mt-4 right-0 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[320px]">
          <div className="flex flex-col space-y-2">
            <input
              autoFocus
              type="text"
              className="w-full bg-white dark:bg-gray-800 rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary"
              placeholder="URL ảnh (https://...)"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <input
              type="text"
              className="w-full bg-white dark:bg-gray-800 rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary"
              placeholder="Mô tả ảnh (tùy chọn)"
              value={alt}
              onChange={({ target }) => setAlt(target.value)}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSubmit}
                className="bg-action p-2 text-primary rounded text-sm font-medium hover:bg-action/90 transition"
              >
                Chèn ảnh
              </button>
              <button
                onClick={hideForm}
                className="bg-gray-200 dark:bg-gray-600 p-2 text-gray-700 dark:text-gray-300 rounded text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedImage;

