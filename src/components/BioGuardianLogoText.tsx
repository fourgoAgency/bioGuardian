import React from "react";

/**
 * Renders "BioGuardian Pharma" styled so that
 * - B and G in "BioGuardian" are blue (#3859a6)
 * - all other letters are dark grey (#222429)
 * - "Pharma" is dark grey (#222429)
 * - Uses Helvetica font, bold, with correct kerning.
 */
const blue = "#3859a6";
const dark = "#222429";
const BioGuardianLogoText = ({
  style = {}
}: {
  className?: string;
  style?: React.CSSProperties;
}) => <span style={{
  letterSpacing: "0.04em",
  fontFamily: "Helvetica, Arial, sans-serif",
  ...style
}} aria-label="BioGuardian Pharma" className="text-xl">
    {/* "B" in blue */}
    <span style={{
    color: blue
  }}>B</span>
    {/* "i" */}
    <span style={{
    color: dark
  }}>i</span>
    {/* "o" */}
    <span style={{
    color: dark
  }}>o</span>
    {/* "G" in blue */}
    <span style={{
    color: blue
  }}>G</span>
    <span style={{
    color: dark
  }}>u</span>
    <span style={{
    color: dark
  }}>a</span>
    <span style={{
    color: dark
  }}>r</span>
    <span style={{
    color: dark
  }}>d</span>
    <span style={{
    color: dark
  }}>i</span>
    <span style={{
    color: dark
  }}>a</span>
    <span style={{
    color: dark
  }}>n</span>
    {/* space */}
    <span>&nbsp;</span>
    {/* "Pharma" in dark */}
    <span style={{
    color: dark
  }}>Pharma</span>
  </span>;
export default BioGuardianLogoText;