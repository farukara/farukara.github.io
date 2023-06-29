import { useState, useEffect } from "react";
import styles from './Contact.module.scss'
import { useTheme } from '../hooks/ThemeCtx'
import { motion } from "framer-motion";
import { pageVariants } from "../App";

import { useForm, ValidationError } from '@formspree/react';

export default function Contact () {
    const numOfChar = 100;
    const { dark } = useTheme()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [msg, setMsg] = useState("")
    const [msgLen, setMsgLen] = useState(numOfChar)


    const inputStyle = {
        backgroundColor: dark ? "#333" : "#ddd",
        color: dark ? "#ddd" : "#333",
    }

    useEffect (() => {
      setMsgLen(numOfChar - msg.length)
      if (msg.length > numOfChar) {
        setMsg(msg.slice(0,numOfChar))
      }
    }, [msg])
  
    const [state, handleSubmit] = useForm("moqbrwow");
    if (state.succeeded) {
      return (
        <motion.div className={styles.main}
          variants={pageVariants}
          initial="hidden"
          animate="show"
          exit="exit"
  
          style={{
              color: dark ? "#ddd" : "#222",
          }}
        >
          <h1>Thanks for contacting!</h1>;
        </motion.div>
      )
    }
  
    return (
    <motion.div className={styles.main}
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
  
      style={{
          color: dark ? "#ddd" : "#222",
      }}
    >
      <form 
        method="POST"
        onSubmit={handleSubmit}
        className={styles.form}
        style={{
          backgroundColor: dark ? "darkslateblue" : "cadetblue"
        }}
      >
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} placeholder="Enter your name..." onChange={(e) => {setName(e.target.value)}}
              style={{
                  ...inputStyle,
              }}
          />
          <label htmlFor="email">Email<sup>*</sup> (required)</label>
          <input type="email" id="email" name="email" required minLength={10} placeholder="Enter your email..." value={email} onChange={(e) => {setEmail(e.target.value)}}
              style={{
                  ...inputStyle,
              }}
          />
          <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" cols={10} rows={5} placeholder="Enter the message..."value={msg} onChange={(e) => {setMsg(e.target.value)}} 
            style={{
                ...inputStyle,
            }}
          />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
        />
        <p
          style={{
              color: msg.length > numOfChar * 0.8 ? "crimson" : "inherit",
          }}
        >
            Remaining characters: {msgLen}
        </p>
        <input type="text" name="_gotcha" style={{display:"none"}} />
        <button type="submit" disabled={state.submitting}>
          Submit
        </button>
      </form>
    </motion.div>
    )
}
