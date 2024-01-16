import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";

// Handler for breadcrumb click
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

type BreadcrumbLink = { name: string; path: string };

// Component Props
interface BreadcrumbProps {
  links: BreadcrumbLink[];
}

// Breadcrumb Component
const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  const navigate = useNavigate();

  return (
    <div role="presentation" onClick={handleClick}>
      <Box marginBottom={2}>
        <Breadcrumbs aria-label="breadcrumb">
          {/* Mapping through provided links to create individual breadcrumb items */}
          {links.map((link: BreadcrumbLink, i: number) => (
            <Link
              key={i}
              underline={!!link.path ? "hover" : "none"}
              color="inherit"
              href={link.path?.toString()}
              onClick={() => navigate(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </Breadcrumbs>
      </Box>
    </div>
  );
};

export default Breadcrumb;
