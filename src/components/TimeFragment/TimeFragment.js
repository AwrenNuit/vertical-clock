import { useEffect, useState } from "react";

export default function TimeFragment({ control, digit, id, val }) {
  const [isActive, setIsActive] = useState(false);
  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    updateActiveState();
    updateMargin();
  }, [control]);

  const updateActiveState = () => {
    const onesDigit = control < 10 ? control : +String(control)[1];
    const tensDigit = control < 10 ? 0 : +String(control)[0];

    if (digit === "ones" && onesDigit === val) setIsActive(true);
    if (digit === "ones" && onesDigit !== val) setIsActive(false);
    if (digit === "tens" && tensDigit === val) setIsActive(true);
    if (digit === "tens" && tensDigit !== val) setIsActive(false);
  };

  const updateMargin = () => {
    const onesDigit = control < 10 ? control : +String(control)[1];
    const tensDigit = control < 10 ? 0 : +String(control)[0];

    if (digit === "ones") setMarginTop(onesDigit * -35);
    if (digit === "tens") setMarginTop(tensDigit * -35);
  };

  return (
    <div
      className="time-fragment"
      style={id.includes("0") ? { marginTop } : {}}
    >
      <div
        id={id}
        className={`time-fragment-inner${isActive ? " active" : ""}`}
      >
        {val}
      </div>
    </div>
  );
}
