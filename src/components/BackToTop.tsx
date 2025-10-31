import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useScroll } from "@/hooks/useScroll";

export default function BackToTop() {
  const { isVisible, scrollTo } = useScroll(700);

  return (
    <div>
      {isVisible && (
        <button
          onClick={() => scrollTo(0)}
          className="fixed bottom-5 right-5 p-4 bg-primary text-white rounded-full shadow-xl hover:opacity-70 transition-all transform hover:scale-110 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            size="lg"
            className="animate-bounce"
          />
        </button>
      )}
    </div>
  );
}
