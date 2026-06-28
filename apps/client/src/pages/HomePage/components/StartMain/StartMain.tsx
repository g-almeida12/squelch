import { useGetUser } from "../../../../features/user/hooks/user.queries";
import { ResumeChallenge } from "../ResumeChallenge";
import { UserProgressCards } from "../UserProgressCards";

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
      <h1 className="mt-4 text-2xl tracking-wide font-heading font-medium">
        {greeting}, {user ? user.name : ".."}.
      </h1>
      <UserProgressCards />

      <ResumeChallenge />
    </>
  );
}
