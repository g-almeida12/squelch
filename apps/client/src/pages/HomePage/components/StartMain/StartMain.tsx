import { useGetUser } from "../../../../features/user/hooks/user.queries";
import { ResumeChallenge } from "../ResumeChallenge";
import { ProgressCards } from "../ProgressCards";

export function StartMain() {
  const { data: user } = useGetUser();

  const hour = new Date().getHours();
  let greeting: string;
  if (5 <= hour && hour <= 11) {
    greeting = "Bom dia";
  } else if (12 <= hour && hour <= 17) {
    greeting = "Boa tarde";
  } else {
    greeting = "Boa noite";
  }

  return (
    <>
      <h1 className="mt-4 text-[25px] font-heading font-semibold tracking-wide">
        {greeting}, {user ? user.name : ".."}.
      </h1>
      
      <ProgressCards />

      <ResumeChallenge />
    </>
  );
}
