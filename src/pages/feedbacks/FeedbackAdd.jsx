import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs.jsx";
import { Button, Card, FormControl } from "react-bootstrap";
import { useState } from "react";
import { createFeedback } from "@/api/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const FeedbackAdd = () => {
  const [text, setText] = useState('')
  
  const breadcrumbs = [
    { title: 'Добавление отзыва' },
  ]
  const navigate = useNavigate()
  
  const onSubmit = () => {
    createFeedback({ message: text })
      .then(() => {
        toast.success('Отзыв успешно добавлен')
        navigate('/orders')
      })
      .catch(() => {
        toast.error('Не удалось отправить отзыв')
      })
  }
  
  return (
    <>
      <div className={'d-flex justify-content-between align-items-center mb-2'}>
        <Breadcrumbs crumbs={breadcrumbs}/>
        <Button variant={'success'} onClick={onSubmit} disabled={text.length < 1}>Добавить</Button>
      </div>
      <Card className={'p-3 border-0'}>
        <FormControl as={'textarea'} onChange={(e) => setText(e.target.value)}/>
      </Card>
    </>
  )
}
