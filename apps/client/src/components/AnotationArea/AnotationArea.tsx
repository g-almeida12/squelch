import { useState, type ChangeEvent } from "react";
import { FaCaretUp } from "react-icons/fa";

interface AnotationAreaProps {
  challengeId: number;
}

export function AnotationArea({ challengeId }: AnotationAreaProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const storageKey = `challenge-anotation-${challengeId}`;
  const [anotation, setAnotation] = useState<string>(
    sessionStorage.getItem(storageKey) ?? "",
  );

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnotation(e.target.value);
    sessionStorage.setItem(storageKey, e.target.value);
  };

  return (
    <div className="rounded-1 overflow-hidden flex flex-col bg-[#03070A]">
      {/* Toolbar */}
      <div className="h-8 shrink-0 bg-gray-800 flex items-center justify-start gap-2 px-4">
        <div className="flex flex-row items-center justify-start gap-2">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer"
            aria-label={`${isOpen ? "Fechar" : "Abrir"} tabelas disponíveis`}
            aria-expanded={isOpen}
            aria-controls="anotation-textarea"
          >
            <FaCaretUp
              className={`text-tx-overlay ${isOpen ? "rotate-0" : "rotate-180"}`}
              size={24}
              aria-hidden={true}
            />
          </button>

          <p className="text-[15px] font-heading font-semibold text-tx-overlay">
            Anotações
          </p>
        </div>
      </div>

      {/* Text area */}
      {isOpen && (
        <textarea
          className="min-h-50 max-h-100 resize-y py-1 pt-3 px-2 outline-none text-tx-overlay"
          value={anotation}
          onChange={(e) => handleTextareaChange(e)}
          id="anotation-textarea"
        ></textarea>
      )}
    </div>
  );
}
