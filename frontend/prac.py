import math

def algo(m,n):



   # NOTE- m and n are always greater than equal to 9.

   # And m <= n

   rt = int(math.ceil(math.sqrt(n)))

   arr1 = [ i for i in range(rt)]

   arr1[1] = 0

   for i in range(2,len(arr1)):

       if arr1[i] == 0:

           continue

       else:

           j = 2*i

           while j<len(arr1):

               arr1[j] = 0

               j += i

   arr1 = [i for i in arr1 if i != 0]
   # arr1 stores all the prime numbers between 2 to sqrt(n) 
   ans = []
   print(arr1)

   n1,n2 = m, rt+m

   while n1 < n:

       if n2 >= n:

           n2 = n

       arr2 =  [ (i+n1) for i in range(n2-n1+1)]

       for i in range(len(arr1)):

        #  First number greater than n1 that is divisible by arr1[i]
           l = n1 // arr1[i] * arr1[i] 

           if l < n1:

               l += arr1[i]
            
        #  making those numbers 0 that are divisible by arr1[i] and are between l and n2
           for j in range(l,n2+1, arr1[i]):

               arr2[j-n1] = 0
               print(arr2, i, j)
            
            
       # appending the prime numbers into the ans array
       ans.extend([i for i in arr2 if i != 0])

       n1 = n2 +1

       n2 += rt

       if 1 in ans:

           ans.remove(1)

   return ans

for _ in range(int(input())):

	m,n = map(int,input().split())

	l = algo(m,n)

	for i in l:

		print(i)

	print("")


# This algorithm prints the prime numbers between the given range [m, n]. 

# First we are finding the prime numbers between 2 to ceil(sqrt(n)) using sieve and store them in arr1.

# Then we are calculating prime numbers between the segments [n1, n2] (where n2 - n1 = rt and n1 starts from m and for next iteration it becomes n2 + 1, till n1 < n).

# For calculating prime numbers between segment [n1, n2], we first make an array arr2 which contains all the numbers from n1 to n2,. Then we start with finding first number in the segment which is divisible by prime number arr1[i], (say l). Then we have to iterate over the range j =  (l, l + arr[i], l + 2.arr[i], ....., till j <= n2) and make arr1[j-n1] = 0 (as these numbers will be divisible by arr1[i] thus they are not primes). After doing this for all prime numbers of arr1, we push the non-zero values of arr2 in our ans array.

# After all segments are processed we are return the ans array.