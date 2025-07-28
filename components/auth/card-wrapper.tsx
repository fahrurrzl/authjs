import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import AuthHeader from "./auth-header";

const CardWrapper = ({
  children,
  title,
  description,
  buttonBackLabel,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  buttonBackLabel: string;
}) => {
  return (
    <Card className="w-full max-w-sm">
      <AuthHeader title={title} description={description} />
      <CardContent>{children}</CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="link" className="w-full text-sm">
          {buttonBackLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
