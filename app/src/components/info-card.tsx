import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";

// Local any-wrappers to avoid overly-strict library prop types causing TS errors
const CardAny: any = Card;
const CardHeaderAny: any = CardHeader;
const CardBodyAny: any = CardBody;
const TypographyAny: any = Typography;
const IconButtonAny: any = IconButton;

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  date: string;
  children: React.ReactNode;
  githubLink?: string;
}

export function InfoCard({ icon: Icon, title, date, children, githubLink }: InfoCardProps) {
  return (
    <CardAny>
      <CardHeaderAny
        className="flex items-center justify-between rounded-none overflow-visible"
        floated={false}
        shadow={false}
        
        >
        <div className="flex flex-col gap-1 w-full">
          <TypographyAny color="blue" className="font-bold text-xs">
            {date}
          </TypographyAny>
          <TypographyAny color="blue-gray" variant="h5" className="w-full">
            {title}
          </TypographyAny>
          {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                LINK
              </a>
            )}
        </div>
        <IconButton
          className="flex-shrink-0 pointer-events-none"
          ripple={false}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </IconButton>
      </CardHeaderAny>
      <CardBodyAny className="grid justify-start !px-3.5 pt-2">
        <TypographyAny className=" font-normal !text-black-500">
          {children}
        </TypographyAny>
      </CardBodyAny>
    </CardAny>
  );
}

export default InfoCard;
