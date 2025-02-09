import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const BreadcrumbContainer = styled.nav`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #666;
    padding: 12px 20px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: fit-content;
    margin: 20px auto;
`;

const BreadcrumbItem = styled(Link)`
    text-decoration: none;
    color: #007bff;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #007bff;
        color: white;
        text-decoration: none;
    }
`;

const ActiveItem = styled.span`
  background: #007bff;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
`;

const Separator = styled.span`
  color: #aaa;
`;

const CustomBreadcrumb = () => {
  const location = useLocation();

  // Convert pathname into breadcrumb items dynamically
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <BreadcrumbContainer>
      <BreadcrumbItem to="/">Home</BreadcrumbItem>

      {pathnames.map((segment, index) => {
        const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={fullPath}>
            <Separator>/</Separator>
            {isLast ? (
              <ActiveItem>{decodeURIComponent(segment)}</ActiveItem>
            ) : (
              <BreadcrumbItem to={fullPath}>{decodeURIComponent(segment)}</BreadcrumbItem>
            )}
          </React.Fragment>
        );
      })}
    </BreadcrumbContainer>
  );
};

export default CustomBreadcrumb;
