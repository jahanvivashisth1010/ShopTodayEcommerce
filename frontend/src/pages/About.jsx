import React from "react";

const About = () => {
  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px",
    background: "#18181b",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    textAlign: "center",
  };

  const socialBtnStyle = {
    display: "inline-block",
    margin: "10px",
    padding: "10px 20px",
    background: "#27272a",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s",
  };

  return (
    <div style={containerStyle}>
      <img
        src="/myphoto.jpg"
        alt="Jahanvi"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #3b82f6",
          marginBottom: "20px",
        }}
      />

      <h2
        style={{
          color: "#fff",
          fontSize: "2.5rem",
          marginBottom: "10px",
        }}
      >
        About Me
      </h2>

      <h3
        style={{
          color: "#3b82f6",
          fontSize: "1.5rem",
          marginBottom: "20px",
        }}
      >
        Hi, I'm Jahanvi 👋
      </h3>

      <p
        style={{
          color: "#a1a1aa",
          fontSize: "1.1rem",
          lineHeight: "1.8",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        I am a passionate Full Stack Web Developer currently learning the MERN
        Stack. I enjoy building responsive and user-friendly web applications
        using React, Node.js, Express, and MongoDB.
        <br />
        <br />
        My goal is to become a skilled software developer by creating real-world
        projects and continuously improving my programming skills.
      </p>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <a
          href="https://github.com/jahanvivashisth1010/"
          target="_blank"
          rel="noreferrer"
          style={socialBtnStyle}
        >
          💻 GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/jahanvish/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(59,130,246,0.2)",
            color: "#3b82f6",
            borderColor: "#3b82f6",
          }}
        >
          💼 LinkedIn
        </a>

        <a
          href="mailto:jahanvivashisth1010@gmail.com"
          style={{
            ...socialBtnStyle,
            background: "rgba(239,68,68,0.2)",
            color: "#ef4444",
            borderColor: "#ef4444",
          }}
        >
          📧 Email
        </a>
      </div>
    </div>
  );
};

export default About;